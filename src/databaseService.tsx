import axios from 'axios';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseAPIUrl = 'https://ismbrwqkcootieaguzwa.supabase.co/rest/v1/';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAPIKey);

const axiosInstance = axios.create({
  baseURL: supabaseAPIUrl,
  headers: {
    'apikey': supabaseAPIKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const databaseService = {

  //table
  async getNodes() {
    try {
      console.log("Khởi chạy getNodes");
      const response = await axiosInstance.get('Nodes');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getType() {
    try {
      console.log("Khởi chạy getType");
      const response = await axiosInstance.get('/Type');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getKind() {
    try {
      console.log("Khởi chạy getKind");
      const response = await axiosInstance.get('/Kind');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getJsonOptions() {
    try {
      console.log("Khởi chạy getJsonOptions");
      const response = await axiosInstance.get('/JsonOptions');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getWorkflows(isFetching: boolean = true) {
    try {
      console.log("Khởi chạy getWorkflows");
      const response = await axiosInstance.get('/Workflows');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  //Nodes
  async getDataNodeList() {
    try {
      const response = await axiosInstance.post('rpc/getnodes');
      if (response) {
        return response.data;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //getNodeByID
  async getNodeByID(id: any) {
    try {
      const response = await axiosInstance.post('rpc/getnodesbyid', { id: id });
      console.log(response)

      if (response) {

        return response.data;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //deleteNodeByID
  async deleteNodeByID(id: any) {
    try {
      const response = await axiosInstance.post('rpc/deletenodesbyid', { e: id });
      console.log(this.deleteJsonOptionsByID(id));
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  },

  //deleteNodeByID
  async deleteJsonOptionsByID(id: any) {
    try {
      const response = await axiosInstance.post('rpc/deleteoptionbyid', { e: id });
      if (response) {

        return response.data;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //getKindByID
  async getKindByID(id: any) {
    try {
      const response = await axiosInstance.post('rpc/getkindbyid', { e: id });
      if (response) {

        return response.data;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //getTypeByID
  async getTypeByID(id: any) {
    try {
      const response = await axiosInstance.post('rpc/getnodesbyid', { e: id });
      if (response) {

        return response.data;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //add Node
  async addNode(name: any, id_kind: any, id_type: any, json_option: any) {
    try {
      const response = await axiosInstance.post('Nodes', {
        name: name, id_kind: id_kind, id_type: id_type
      });
    } catch (error) {
      console.error('Error:', error);

      return false;
    }
    try {
      const response = await axiosInstance.post('JsonOptions', {
        name_jsonoptions: json_option
      });
    } catch (error) {
      console.error('Error:', error);

      return false;
    }

    return true;
  },
  updateNode: async (id: number, name: any, id_kind: any, id_type: any, json_option: object) => {
    try {
      const response = await axiosInstance.patch('Nodes?id=eq.' + id, { id_kind: id_kind, id_type: id_type, name: name });

    } catch (error) {
      console.error('Error:', error);

      return false;
    }
    try {
      const response = await axiosInstance.patch('JsonOptions?id=eq.' + id, { name_jsonoptions: json_option });

    } catch (error) {
      console.error('Error:', error);

      return false;
    }

    return true;
  },

  //add kind
  async addKind(name_kind: any) {
    try {
      const response = await axiosInstance.post('Kind', {
        name_kind: name_kind
      });
      if (response) {
        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //create workflow 
  async createWorkflow(name: any, createdAt: any, userId: any, script: any) {
    try {
      const response = await axiosInstance.post('Workflows', {
        name: name, createdAt: createdAt, userId: userId, script: script
      });
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //delete workflow
  async deleteWorkflow(id: any) {
    try {
      const response = await axiosInstance.post('Workflows?id=eq.' + id);
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    return true;
  },
  //update kind
<<<<<<< HEAD
  async updateKind(id: string, name_kind: string) {
    try {
      const response = await axiosInstance.post('Kind?id=eq.' + id, { name_kind: name_kind });
      if (response) {

        return response;
=======
  async updateKind(id:any,name_kind:string) {
    try {
      const response = await axiosInstance.patch('Kind?id=eq.'+id,{name_kind: name_kind});
      if (response) {
        
        return true;
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    return true;
  },
  //
  //delete kind
  async deleteKind(id: any) {
    try {
<<<<<<< HEAD
      const response = await axiosInstance.post('Kind?id=eq.' + id);
=======
      const response = await axiosInstance.delete('Kind?id=eq.'+id);
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    return true;
  },
  //getElementType
  async getElementType() {
    try {
      console.log("Khởi chạy getElementType");
      const response = await axiosInstance.get('/ElementType');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  //add type 
  async addType(name_type: any) {
    try {
      const response = await axiosInstance.post('Type', {
        name_type: name_type
      });
      if (response) {
        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    return true;
  },
<<<<<<< HEAD
  //update type name_type: newName
  async editType(id: string, newName: string) {
    try {
      const response = await axiosInstance.post('Type?id=eq.' + id, { name_type: newName });
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
  //delete type
  async deleteType(id: any) {
    try {
      const response = await axiosInstance.post('Type?id=eq.' + id);
      if (response) {

        return response;
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
=======
//update type name_type: newName
async  editType(id: string, newName: string) {
  try {
    const response = await axiosInstance.patch('Type?id=eq.'+id,{name_type: newName});
    if (response) {
      
      return response;
    } else {
      console.error('Error:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
},
//delete type
async deleteType(id:any) {
  try {
    const response = await axiosInstance.delete('Type?id=eq.'+id);
    if (response) {
      
      return response;
    } else {
      console.error('Error:', response);
>>>>>>> 4bb149ec59587c4ebcf3b30276805579b62c7b6a
    }

    return true;
  },


  //user
  // async sign_in(email: any, password: any) {
  //   try{
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password,
  //     });
  //     if(error){
  //       return error;
  //     }
  //     else {
  //       return true;
  //     }
  //   } catch (error:any) {
  //     console.error('Login error:', error.message);
  //     throw new Error('Login failed');
  //   }
  //   try {
  //     const { user, error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password,
  //     });

  //     if (error) {
  //       console.error('Login error:', error.message);
  //       throw new Error('Login failed');
  //     }

  //     // Retrieve the current user and session
  //     const currentUser = supabase.auth.user();
  //     const currentSession = supabase.auth.session();

  //     if (currentUser && currentSession) {
  //       localStorage.setItem('access_token', currentSession.access_token);
  //       localStorage.setItem('refresh_token', currentSession.refresh_token);
  //     }
  // } catch (error) {
  //   console.error('Login error:', error.message);
  //   throw new Error('Login failed');
  // } 
  async sign_up(supabase: any, email: any, password: any) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        if (error.message.includes('already registered')) {
          return { success: false, message: 'Email đã được sử dụng. Vui lòng chọn email khác.' };
        } else {
          return { success: false, message: `Lỗi đăng ký: ${error.message}` };
        }
      }

      return { success: true, message: 'Đăng ký thành công' };
    } catch (error: any) {
      return { success: false, message: `Lỗi đăng ký: ${error.message}` };
    }
  },




  async sign_out(supabase: SupabaseClient, toast: any, redirectPath: string) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error:', error.message);
        toast.error('Đăng xuất thất bại');
      } else {
        localStorage.removeItem('token');
        toast.success('Đăng xuất thành công');
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
      toast.error('Đăng xuất thất bại');
    }
  }



};

export default databaseService;
