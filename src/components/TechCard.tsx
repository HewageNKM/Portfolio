export default function TechCard({img,title}:{title:string}) {
  return (
    <div className="rounded-md flex flex-row justify-center content-center gap-1 shadow border-slate-100">
        <figure>
            {img}
        </figure>
        <p>{title}</p>
    </div>
  )
}
