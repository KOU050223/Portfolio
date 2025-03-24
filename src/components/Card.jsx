import '../App.css'

function Card({img,title,text}) {

    const base = process.env.GITHUB_PAGES ? '/portfolio-app/' : './';

    return (
        <>
            <img className="card-img" src={`${img}`} alt="NoData" />
            <div className="card-content">
            <p className="card-title">{title}</p>
            <p className="card-text"dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>
        </>
    )
}

export default Card