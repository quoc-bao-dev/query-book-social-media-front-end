const FileType = ({ fileType }: { fileType: string }) => {
  return (
    <p className='mt-2 text-info-500 capitalize border border-info-400 px-2 py-1 rounded-lg bg-info-100 text-xs font-semibold'>
      {fileType}
    </p>
  );
};

export default FileType;
