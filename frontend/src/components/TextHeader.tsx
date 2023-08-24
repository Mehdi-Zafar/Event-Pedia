const TextHeader = ({title}:TextHeaderProps) => {
    return ( 
        <section className="h-56 w-full relative flex justify-center items-end">
            <div>
                <h2 className="text-amber-300 text-4xl text-center">{title}</h2>
                <div className="h-1 w-20 rounded-lg bg-amber-300 mt-4 text-center mx-auto"></div>
            </div>
        </section>
     );
}
 
export default TextHeader;


interface TextHeaderProps{
    title:string
}