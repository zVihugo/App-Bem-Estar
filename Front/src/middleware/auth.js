import api from "../services/api";
import Cookies from "js-cookie";

export const register = async (name, email, dataOfBirth, faculty, course, password) => {
    try {
        console.log(name, email, dataOfBirth, faculty, course, password);
        const response = await api.post('/auth/registro', name, email, dataOfBirth, faculty, course, password);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.response?.data?.details);
        throw error.response?.data?.details
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
        const response = await api.get(`/usuarios/${id}`, {
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
        const response = await api.delete(`/usuarios/${id}`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });

        return response.data;
    }catch(error){
      
        throw error.response?.data?.error;
    }
}

export const updateUser = async (id, name, dataDeNascimento, faculdade, curso) => {
    try {
        console.log('Atualizando usuário:', { id, name, dataDeNascimento, faculdade, curso });
        const response = await api.put(
            `/usuarios/${id}/perfil`,
            
            { name, dataDeNascimento, faculdade, curso }, 
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
            `/usuarios/${id}/senha`,
            {senhaAntiga, novaSenha },
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

export const reviewCreate = async (data) => {
    try {
        const response = await api.post(
            `avaliacoes/registrar`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
}

export const allReport = async(id)=> {
    try {
        const response = await api.get(
            `relatorio/todosRelatorio/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        )
        return response.data;
    }catch(error){
        throw error.response?.data;
    }
}

export const sevenReport = async(id) => {
    try{
        const response = await api.get(
            `relatorio/ultimos7diasRelatorio/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        )
        return response.data;
    }catch(error){
        throw error.response?.data;
    }
}

export const thirtyReport = async(id) => {
    try{
        const response = await api.get(
            `relatorio/ultimos30diasRelatorio/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        )
        return response.data;
    }catch(error){
        throw error.response?.data;
    }
}

export const getDicas = async () => {
    try {
        const response = await api.get(`dicas/`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dicas:", error);
        throw error.response?.data;
    }
};

export const createDicas = async (dicaData, userId) => {
    try {
        const response = await api.post(
            `dicas/create`,
            { titulo: dicaData.titulo, tipo: dicaData.tipo, thumbnailUrl: dicaData.thumbnailUrl, link: dicaData.link}, // Adiciona o userId ao corpo da requisição
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao criar dica:", error);
        throw error.response?.data;
    }
};

export const deleteDicas = async (id) => {
    try {
        const response = await api.delete(
            `dicas/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
}

export const updateDicas = async (id, titulo, tipo, thumbnailUrl, link) => {
    try {
        const response = await api.put(
            `dicas/${id}`,
            { titulo, tipo, thumbnailUrl, link },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
}

export const createMeta = async (metaData) => {
    try {
        const response = await api.post(
            '/metas/create',
            metaData,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
};


export const getMetaById = async (id) => {
    try {
        const response = await api.get(
            `/metas/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
};


export const getAllMetasByUserId = async (userId) => {
    try {
        const response = await api.get(
            `/metas/todosDoUsuario/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
};


export const updateMeta = async (id, metaData) => {
    try {
        const response = await api.put(
            `/metas/${id}`,
            metaData,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
};

export const deleteMeta = async (id) => {
    try {
        const response = await api.delete(
            `/metas/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data;
    }
};


export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('Id');
  
}