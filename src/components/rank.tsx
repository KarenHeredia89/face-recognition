const Rank = ({ name, entries }: { name: string; entries: number }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl">
        {`${name}, your current entry count is...`}
      </div>
      <div className="text-violet-500 text-4xl font-bold">{entries}</div>
    </div>
  );
};

export default Rank;
