import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./index.css"

function SkillPopup({ children, createSkill }) {
    const [formData, setFormData] = useState({ title: '', description: '', tags: '', imageUrl: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };





    return (
        <Popup trigger={<span>{children}</span>} modal nested>
            {close => {

                const submitForm = event => {
                    event.preventDefault()
                    createSkill(formData)
                    setFormData({ title: '', description: '', tags: '', imageUrl: '' })
                    close()
                }

                return (
                    <div>
                        <form onSubmit={submitForm} id='skillForm'>
                            <h3> Create Skill </h3>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="tags"
                                placeholder="Tags"
                                value={formData.tags}
                                onChange={handleChange}
                            />
                            <input
                                required
                                type="url"
                                name="imageUrl"
                                placeholder="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                            <div className='d-flex flex-row justify-content-evenly m-3'>
                                <button type="submit" className='btn btn-primary'> Create Skill </button>
                                <button type="button" onClick={close} className='btn btn-danger'>Close</button>
                            </div>
                        </form>
                    </div>
                )
            }}
        </Popup>
    );
}

export default SkillPopup;
