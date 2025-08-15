import "./index.css"




const MentorSkillItem = (props) => {

    const { userDetails } = props
    const { title, description, tags, imageUrl, createdAt } = userDetails
    const date = createdAt.split("T")[0]

    return (
        <li className="mentor-skill-item">
            <aside>
                <h1> {title} </h1>
                <p> {description} </p>
                <h3> Tags: <span> {tags} </span> </h3>
                <h3> created at: <span> {date} </span> </h3>
            </aside>
            <img src={imageUrl} alt="LOGO" />
        </li>
    )
}

export default MentorSkillItem