import api from "../services/api";
import Cookies from "js-cookie";

export const register = async (name, email, dataOfBirth, faculty, course, password) => {
    try {
        const response = await api.post('/auth/register', name, email, dataOfBirth, faculty, course, password);
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.response?.data?.error);
        throw error.response?.data?.error
    }
}

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', email, password);
       
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('Id', response.data.user.id, { expires: 7 });

        return response.data;
    } catch (erro) {
     
        throw erro.response?.data?.error;
    }
}

export const getUser = async (id) => {
    try{
        const response = await api.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });
        return response.data;
    }catch (error) {
       
        throw error.response?.data?.error;
    }
}

export const deleteUser = async (id) => {
    try{
        const response = await api.delete(`/users/${id}`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });

        return response.data;
    }catch(error){
      
        throw error.response?.data?.error;
    }
}

export const updateUser = async (id, name, dateOfBirth, faculty, course) => {
    try {
     
        const response = await api.put(
            `/users/${id}/profile`,
            { name, dateOfBirth, faculty, course }, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );

        return response.data;
    } catch (error) {
      
        throw error.response?.data?.error || 'Erro ao atualizar o perfil.';
    }
};

export const updatePassword = async (id, senhaAntiga, novaSenha) => {
    try{
        const response = await api.put(
            `/users/${id}/password`,
            { oldPassword: senhaAntiga, newPassword: novaSenha },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        )
        return response.data;
    }catch(error){
      
        throw error.response?.data;
    }
}

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('Id');
  
}