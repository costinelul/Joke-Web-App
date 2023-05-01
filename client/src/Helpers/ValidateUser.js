async function ValidateUser() {
    const response = await fetch("https://joke-app-api.azurewebsites.net/api/Auth/validate-user", {
        credentials: "include",
    });
    if (response.status === 401) {
        return null;
    }
    if (response.status === 200) {
        const user = await response.json();
        return user;
    }
}
export default ValidateUser;
