const CheckerTool = ({ name, url }: { name: string; url: string }) => {
  return (
    <iframe
      className="size-[133.3%] scale-75 transform origin-top-left"
      title={name}
      src={url}
      loading="lazy"
    />
  );
};

export default CheckerTool;
