'use client';
import Modal from '@/components/common/Modal';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useDeleteCommentMutation } from '@/queries/comment';
import { useDeletePostMutation } from '@/queries/post';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { signify } from 'react-signify';

type ModalConfirmProps = {
  isShow: boolean;
  Type: string;
  Id: string;
  postId: string;
};

export const sModalConfirm = signify<ModalConfirmProps>({
  isShow: false,
  Type: '',
  Id: '',
  postId: '',
});

export const useModalConfirm = () => ({
  openConfirm: () => sModalConfirm.set((n) => (n.value.isShow = true)),
  closeConfirm: () => {
    sModalConfirm.set((n) => (n.value.isShow = false));
  },
});

const ModalConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isShow, Type, Id, postId } = sModalConfirm.use();
  const { closeConfirm } = useModalConfirm();
  const { mutateAsync: deletePost } = useDeletePostMutation();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation(postId);

  const handelDelete = async () => {
    setIsLoading(true);
    if (Type === 'post') {
      console.log('delete post', Id);
      await deletePost(Id);
      setIsLoading(false);
      closeConfirm();
    }
    if (Type === 'comment') {
      console.log('delete comment', Id);
      await deleteComment(Id);
      setIsLoading(false);
      closeConfirm();
    }
  };

  return (
    <Modal isOpen={isShow} onClose={closeConfirm}>
      <div className='w-[350px] bg-card p-4 rounded-lg'>
        <Dialog open={isShow} onOpenChange={closeConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className='w-full p-2'>
                  {Type === 'post'
                    ? 'Bạn có chắc chắn xóa bài viết không?'
                    : 'Bạn có chắc chắn xóa bình luận không?'}
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className='w-full mt-5'>
              <div className='flex gap-2 w-full'>
                <Button
                  className='flex-1'
                  onClick={handelDelete}
                  variant='destructive'
                >
                  {isLoading ? <LoadingIcon size={10} /> : 'Có'}
                </Button>
                <Button
                  className='flex-1'
                  onClick={() => {
                    closeConfirm();
                    setIsLoading(false);
                  }}
                  variant='outline'
                >
                  Không
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
