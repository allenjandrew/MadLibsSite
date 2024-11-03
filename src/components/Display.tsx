interface DisplayProps {
  image: string;
  sentence: string;
}

const Display = (p: DisplayProps) => {
  return (
    <div>
      <p>{p.sentence}</p>
      <div className="text-center">
        <img
          className="rounded img-fluid w-50 text-center"
          src={p.image}
          alt="display"
        />
      </div>
    </div>
  );
};

export default Display;
