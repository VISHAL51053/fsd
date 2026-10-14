function ProfileHeader({ profile }) {
    return (
        <header className="profile-header">
            <h1>{profile.name}</h1>
            <h3>{profile.role}</h3>
        </header>
    );
}

export default ProfileHeader;