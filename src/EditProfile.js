import React from 'react';

function EditProfile(props) {

    return (
        <div className='black-bg'>
            <div className="errorContainer">
                <div className="errorBox">
                    <h2 ><i className="fas fa-users" />프로필 편집</h2>
                    <div className='editField'>
                        <div className="inputField">
                            <i className="fas fa-key"></i>
                            <label>비밀번호</label>
                            <button type='button'>변경하기</button>
                        </div>
                    </div>

                    <div className="errorBtns">
                        <button className="errorBtn">저장하기</button>
                        <button type="button" className="errorBtn" onClick={() => { props.setEditProfileState(false) }}>나가기</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;