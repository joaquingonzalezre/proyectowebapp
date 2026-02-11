import Image from "next/image";

export default function ProjectItem({ title, subtitle, image, isLarge }) {
  return (
    <div className={`proyecto-item ${isLarge ? "grande" : ""}`}>
      <div className="marco-imagen">
        <Image
          src={image}
          alt={title}
          width={isLarge ? 1600 : 1000}
          height={1000}
          className="img-cover"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <div className="info-proyecto">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
}
