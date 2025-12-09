interface TechCardProps {
  img?: string;
  title: string;
}

export default function TechCard({ img, title }: TechCardProps) {
  return (
    <article className="flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out bg-white dark:bg-neutral-800 border border-transparent dark:border-neutral-700">
      {img && (
        <figure className="w-6 h-6 text-black dark:text-white flex items-center justify-center">
          <img src={img} alt={title} className="w-full h-full" />
        </figure>
      )}
      <p className="text-slate-800 dark:text-neutral-200 font-bold md:text-lg text-sm">
        {title}
      </p>
    </article>
  );
}
