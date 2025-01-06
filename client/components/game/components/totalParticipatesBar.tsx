const TotalParticipatesBar = ({ data }: { data: any }) => {
  return (
    <>
      <div className="font-medium text-white text-lg">
        Participants {String(data?.AllNumbers.length || 0)}
      </div>
      <div className="mt-1 text-white text-lg">
        <div className=" bg-[#360712]">
          <div
            style={{ width: `${data?.AllNumbers.length || 0}%` }}
            className="bg-white h-1"
          />
        </div>
        <div className="mt-1 flex justify-between font-medium text-white text-lg">
          <span>{String(data?.AllNumbers.length || 0)}</span>
          <span>100</span>
        </div>
      </div>
    </>
  );
};

export default TotalParticipatesBar;
