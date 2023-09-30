
export default async function adminAuth(){
    const token = localStorage.getItem('token');
    if(token){
        const response = await fetch('http://localhost:5000/api/auth/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        if(response.status === 200){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}