interface TechCardProps {
  img?: string;
  title: string;
}

export default function TechCard({ img: Icon, title }: TechCardProps) {
  return (
    <article className="flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out bg-white">
      {Icon && (
        <figure className="w-6 h-6 text-black flex items-center justify-center">
          <img src={Icon} alt={title} className="w-full h-full" />
        </figure>
      )}
      <p className="text-slate-800 font-bold md:text-lg text-sm">{title}</p>
    </article>
  );
}
