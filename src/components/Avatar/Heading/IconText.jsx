export default function IconText({ icon, text }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <div className="icon">
        <img src={icon} alt="" className="w-6 h-5" />
      </div>
      <div className="flex-1">{text}</div>
    </div>
  );
}
