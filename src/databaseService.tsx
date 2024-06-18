import axios from 'axios';

import { createClient,SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseAPIUrl = 'https://ismbrwqkcootieaguzwa.supabase.co/rest/v1/';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';

const supabase : SupabaseClient = createClient(supabaseUrl, supabaseAPIKey);

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
      const response = await axiosInstance.get('/Nodes');
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getType() {
    try {
      const response = await axiosInstance.get('/Type');
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getKind() {
    try {
      const response = await axiosInstance.get('/Kind');
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getJsonOptions() {
    try {
      const response = await axiosInstance.get('/JsonOptions');
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getWorkflows(isFetching: boolean = true) {
    try {
      const response = await axiosInstance.get('/Workflows');
      // localStorage.setItem('WorkFlows',response.data)

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  //Nodes
  async getNodesList() {
    try {
      const { data, error } = await supabase
      .rpc('getnodes');
      if (error) console.error(error)
      else return data;
    } catch (error) {
      console.error('Error:', error);
    }
  },
  //----------------------------------------
  async getDataNodeList() {  
    const flag_load = localStorage.getItem('flag_load');
    if(flag_load === 'true') {
        localStorage.setItem("flag_load", 'false');
        const nodes = await this.getNodesList();
        const json = JSON.stringify(nodes);
        localStorage.setItem("NodesList", json);

        return nodes;
    }else {
        const nodes = localStorage.getItem("NodesList");
        if (nodes !== null) {
            const json = JSON.parse(nodes);

            return json;
        }
    }
  },
  
  //getNodeByID
  async getNodeByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('getnodesbyid', {
        e:id
      })
      if (error) {
        console.error('Error:', error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //deleteNodeByID
  async deleteNodeByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('deletenodesbyid', {
        e:id
      });
      this.deleteJsonOptionsByID(id);
      if (error) {
        console.error('Error:', error.message);
      } else {
        return true;
      }
      
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //deleteNodeByID
  async deleteJsonOptionsByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('deleteoptionbyid', {
        e:id
      })
      if (error) {
        console.error('Error:', error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //getKindByID
  async getKindByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('getkindbyid', {
        e:id
      })
      if (error) {
        console.error('Error:', error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //getTypeByID
  async getTypeByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('getnodesbyid', {
        e:id
      })
      if (error) {
        console.error('Error:', error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //add Node
  async addNode(name:any, id_kind:any, id_type:any, json_option:any) {
    try {
      const { data, error } = await supabase
        .from('Nodes')
        .insert([
          { name: name, id_kind: id_kind, id_type: id_type },
        ])
        .select();
      if (error) {
        console.error('Error:', error.message);
      } else{
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    try {
      const { data, error } = await supabase
        .from('JsonOptions')
        .insert([
          { name_jsonoptions : json_option },
        ])
        .select();
      if (error) {
        console.error('Error:', error.message);
      } else{
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
    return true;
  },

  //add kind
  async addKind(name_kind:any) {
    try {
      const response = await fetch('https://ismbrwqkcootieaguzwa.supabase.co/rest/v1/Kind', {
        method: 'POST',
        headers: {
          'apikey': supabaseAPIKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify([{ name_kind: name_kind }]),
      });
      if (response.ok) {
        console.log('Success')
        
return true;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  },
  //create workflow
  async createWorkflow(name:any, createdAt:any, userId:any, script:any) {
    try {
      const { data, error } = await supabase
      .from('Workflows')
      .insert([
        { name: name, createdAt: createdAt, userId: userId, script: script },
      ])
      .select()
      if (error) {
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
    return true;
  },

  //delete workflow
  async deleteWorkflow(id:any) {
    try {
        const { error } = await supabase
        .from('Workflows')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
    return true;
  },
  //update kind
  async updateKind(id:string,name_kind:string) {
    try {
        const { data, error } = await supabase
            .from('Kind')
            .update({ name_kind: name_kind})
            .eq('id',id)
            .select()
        if (error) {
          console.error('Error:', error.message);
        } else{
          console.log(data);
        }
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
      
return true;
},
  //
  //delete kind
  async deleteKind(id:any) {
    try {
        const { error } = await supabase
        .from('Kind')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
    return true;
  },
  //getElementType
  async getElementType() {
    try {
      const response = await axiosInstance.get('/ElementType');

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  //add type
  async addType(name_type:any) {
    try {
      const { data, error } = await supabase
        .from('Type')
        .insert([
          { name_type: name_type },
        ])
        .select();
      if (error) {
        console.error('Error:', error.message);
      } else{
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
    return true;
  },
//update type
async  editType(id: string, newName: string) {
  try {
      const { data, error } = await supabase
          .from('Type')
          .update({ name_type: newName })
          .eq('id', id)
          .select();

      if (error) {
          throw error;
      }
      
      return data;
  } catch (error) {
      console.error('Error editing type');
      throw error;
  }
},
//delete type
async deleteType(id:any) {
  try {
      const { error } = await supabase
      .from('Type')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error:', error.message);
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
  
  return true;
},


  //user
  async sign_in(email: any, password: any) {
    try{
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if(error){
        return error;
      }
      else {
        return true;
      }
    } catch (error:any) {
      console.error('Login error:', error.message);
      throw new Error('Login failed');
    }
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
  },   
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