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

let getID:number = 0;

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
  async getWorkflows() {
    try {
      const response = await axiosInstance.get('/Workflows');
      
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
      getID = data.length+1;
      localStorage.setItem("ID", getID+'');
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
        return data;
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
      const { data, error } = await supabase
        .from('Kind')
        .insert([
          { name_kind: name_kind },
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
  async sign_up() {
    
  },
  async sign_out() {
    
  }
};

export default databaseService;