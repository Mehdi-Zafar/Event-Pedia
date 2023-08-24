const PhotoHeader = ({title}:PhotoHeaderProps) => {
    return ( 
        <section className="h-96 w-full relative flex justify-center items-center">
            <div className="absolute w-full h-full -z-10"></div>
            <h2 className="text-amber-300 text-4xl text-center">{title}</h2>
        </section>
     );
}
 
export default PhotoHeader;


interface PhotoHeaderProps{
    img:string,
    title:string
}

// style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),url(${img})`,backgroundSize:'cover',backgroundPosition:'center'}}