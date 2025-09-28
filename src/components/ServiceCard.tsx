interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <article className="flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 w-full md:w-52 lg:w-60 h-full">
        <Icon className="text-4xl mb-4 text-black dark:text-white" />
      <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </article>
  );
}
