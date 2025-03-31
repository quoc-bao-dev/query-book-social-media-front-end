import axiosClient from '@/httpClient';
import { HttpResponse, HttpResponseWithPagination } from '@/types/common';
import { QuestionResponse } from '@/types/question';
import { SaveQuestionResponse } from '@/types/saveQuestion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Swal from 'sweetalert2';

interface QuestionPayload {
  title: string;
  content: string;
  topic: string;
  code: {
    fileType: string;
    code?: string;
  };
  hashtags?: string[];
  images: string[];
}


const getAllQuestions = (limit: number, page: number, search: string, topic?: string) =>
  axiosClient
    .get<HttpResponseWithPagination<QuestionResponse[]>>(
      `/questions/?limit=${limit}&page=${page}${search ? `&s=${search}` : ''}${topic ? `&topic=${topic}` : ''}`,
    )
    .then((response) => response.data);

    export const useQuestionQuery = ({
      limit = 10,
      page = 1,
      search,
      topic,
    }: {
      limit: number;
      page: number;
      search: string;
      topic?: string;
    }) => {
      return useQuery({
        queryKey: ['questions', { limit, page, search, topic }],
        queryFn: () => getAllQuestions(limit, page, search, topic),
      });
    };

const postCreateQuestion = (payload: QuestionPayload) =>
  axiosClient.post('/questions', payload);

export const useCreateQuestionMutation = () => {
  const t = useTranslations('question')

  return useMutation({
    mutationFn: postCreateQuestion,
    onSuccess: () => {
      Swal.fire({
        title: t("successTitle"),
        text: t("successText"),
        icon: "success",
        backdrop: `rgba(0,0,0,0.4)`,
        timer: 2000, // Hiển thị trong 2 giây
        showConfirmButton: false, // Tắt nút xác nhận
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
        }
      }).then(() => {
        window.location.href = "/myquestion";
      });
    },
    onError: (error) => {
      Swal.fire({
        title: t("errorTitle"),
        text: t("errorText"),
        icon: "error",
        confirmButtonText: t("okButtonText")
      });
      console.error("Error posting question:", error);
    }
  });
};

const getMyQuestion = () =>
  axiosClient
    .get<HttpResponse<QuestionResponse[]>>('/questions/my-question')
    .then((response) => response.data.data);

export const useGetMyQuestion = () => {
  return useQuery({
    queryKey: ['my-question'],
    queryFn: getMyQuestion,
  });
};

const getMySaveQuestion = () =>
  axiosClient
    .get<HttpResponse<SaveQuestionResponse[]>>('/questions/save/')
    .then((response) => response.data.data);

export const useGetMySaveQuestionQuery = () => {
  return useQuery({
    queryKey: ['my-save-question'],
    queryFn: getMySaveQuestion,
  });
};

// save
const postSaveQuestion = (questionId: string) =>
  axiosClient.post(`/questions/save`, { questionId });

export const useSaveQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSaveQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-save-question'] });
    },
  });
};

// un save
const postUnsaveQuestion = (questionId: string) =>
  axiosClient.post(`/questions/unsave`, { questionId });

export const useUnsaveQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUnsaveQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-save-question'] });
    },
  });
};

// delete
const deleteQuestion = async (questionId: string, t: (key: string) => string) => {
  const result = await Swal.fire({
    title: t("deleteWarningTitle"),
    text: t("deleteWarningText"),
    icon: "warning",
    iconColor: "#ff7043",
    showCancelButton: true,
    confirmButtonColor: "#b71c1c",
    cancelButtonColor: "#444",
    confirmButtonText: t("deleteConfirmButton"),
    cancelButtonText: t("deleteCancelButton"),
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
    return axiosClient.delete(`/questions/${questionId}`);
  }
  throw new Error("Deletion cancelled");
};

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("question"); 

  return useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId, t),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["my-question"] });

      Swal.fire({
        title: t("deleteSuccessTitle"),
        text: t("deleteSuccessText"),
        icon: "success",
        iconColor: "#4CAF50",
        confirmButtonColor: "#ff7043",
        background: "#1c1c1c",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    },
    onError: (error) => {
      if (error.message !== "Deletion cancelled") {
        Swal.fire({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
          icon: "error",
          iconColor: "#ff1744",
          confirmButtonText: t("deleteRetryButton"),
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

// sua cau hoi 
const patchEditQuestion = ({
  questionId,
  payload,
}: {
  questionId: string;
  payload: {
    question?: string;
    code?: {
      fileType: string;
      code?: string;
    };
  };
}) => axiosClient.patch(`/questions/${questionId}`, payload);

export const useEditQuestionMutation = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("question");

  return useMutation({
    mutationFn: patchEditQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["my-question"] });

      Swal.fire({
        title: t("editSuccessTitle"),
        text: t("editSuccessText"),
        icon: "success",
        confirmButtonColor: "#22c55e",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: t("editErrorTitle"),
        text: t("editErrorText"),
        icon: "error",
        confirmButtonText: t("okButtonText"),
      });
      console.error("Error editing question:", error);
    },
  });
};

