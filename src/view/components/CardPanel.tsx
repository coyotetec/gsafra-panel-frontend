interface CardPanelProps {
  image: string;
  descriptionImg: string;
  title: string;
  farm: string;
}

export function CardPanel({
  descriptionImg,
  farm,
  image,
  title,
}: CardPanelProps) {
  return (
    <div className="h-50 w-50 flex transform cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-linear-green transition-transform hover:scale-105">
      <img src={image} alt={descriptionImg} className="w-32" />
      <h2 className="mt-1.5 text-xl font-semibold text-white">{title}</h2>
      <span className="leading-none text-white/80">{farm}</span>
    </div>
  );
}
