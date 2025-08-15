import "./index.css"

const EmptyView = () => {
    return (
        <div className="empty-container p-5">
            <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752940397/Empty-cuate_rmj4my.png" alt="emptyView" />
            <h1> No results found for your search. </h1>
        </div>
    )
}

export default EmptyView