import axiosClient from '@/httpClient';
import { HttpResponse } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Swal from 'sweetalert2';

type AnswerPayload = { content: string };
type AnswerType = {
  _id: string;
  questionId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  content: string;
  images?: string[];
  code?: {
    fileType: string;
    code: string;
  };
  createdAt: string;
  votes?: { user: {_id: string} , voteType: 'up' | 'down'}[]; 
};



const postSaveQuestion = (questionId: string) =>
  axiosClient
    .get<HttpResponse<AnswerType[]>>(`/answers/${questionId}`)
    .then((respone) => respone.data.data);

export const useAnswerQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: () => postSaveQuestion(questionId),
  });
};

const postAnswer = (questionId: string, payload: AnswerPayload) =>
  axiosClient.post('/answers', { questionId, ...payload });

export const useAnswerMutation = (questionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AnswerPayload) => postAnswer(questionId, payload),
    onSuccess: () => {
      // update question list
      queryClient.invalidateQueries({ queryKey: ['answers', questionId] });
    },
  });
};
//vote
const voteAnswer = (answerId : string, type: 'up' | 'down') =>
  axiosClient.post(`/answers/${answerId}/vote`, {vote: type})

export const useVoteAnswerMutation = ( questionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ answerId , type }: { answerId : string; type: 'up' | 'down' }) =>
      voteAnswer(answerId , type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers', questionId ] });
    },
  });
};

const deleteAnswer = (answerId: string) => axiosClient.delete(`/answers/${answerId}`);

export const useDeleteAnswerMutation = (questionId: string) => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answerId: string) => {
      const result = await Swal.fire({
        title: t("deleteAnswer.confirmTitle"),
        text: t("deleteAnswer.confirmText"),
        icon: "warning",
        iconColor: "#ff7043",
        showCancelButton: true,
        confirmButtonColor: "#b71c1c",
        cancelButtonColor: "#444",
        confirmButtonText: t("deleteAnswer.confirmButton"),
        cancelButtonText: t("deleteAnswer.cancelButton"),
        reverseButtons: true,
        background: "#1c1c1c",
        color: "#fff",
        backdrop: `rgba(183, 28, 28, 0.6)`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },

    
      });

      if (result.isConfirmed) {
        return deleteAnswer(answerId);
      } else {
        throw new Error("Deletion canceled");
      }
    },
    onSuccess: () => {
      Swal.fire({
        title: t("deleteAnswer.successTitle"),
        text: t("deleteAnswer.successText"),
        icon: "success",
        iconColor: "#4CAF50",
        confirmButtonColor: "#ff7043",
        background: "#1c1c1c",
        color: "#fff",
        timer: 1000,
        showConfirmButton: false,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
    },
    onError: (error) => {
      if (error.message !== "Deletion canceled") {
        Swal.fire({
          title: t("deleteAnswer.errorTitle"),
          text: t("deleteAnswer.errorText"),
          icon: "error",
          iconColor: "#ff1744",
          confirmButtonText: t("deleteAnswer.retryButton"),
          confirmButtonColor: "#b71c1c",
          background: "#2c2c2c",
          color: "#fff3f3",
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    },
  });
};

// sua 
const editAnswer = (answerId: string, payload: { content: string; code?: { fileType: string; code: string } }) =>
  axiosClient.patch(`/answers/${answerId}`, payload);

export const useEditAnswerMutation = (questionId: string) => {
  const t = useTranslations("question");

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ answerId, payload }: { answerId: string; payload: { content: string; code?: { fileType: string; code: string } } }) =>
      editAnswer(answerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers', questionId] });
      Swal.fire({
              title: t("editSuccessTitle"),
              text: t("editanswerSuccessText"),
              icon: "success",
              confirmButtonColor: "#22c55e",
              timer: 2000,
              showConfirmButton: false,
            });
    },
  });
};


