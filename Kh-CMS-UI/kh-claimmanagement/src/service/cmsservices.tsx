import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "./ServiceInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRoutesState } from "../types/cmstypes";


// getTimeEntry :-
export const getUser = createAsyncThunk(
    "user/getUser",
    async (UserId : string | null) => {
      try {
        const response = await axiosInstance.get(`/cms/getUserDetails?UserId=${UserId}`);
        return response.data;
      } catch (error) {
        throw new Error("Something went wrong!!!");
      }
    }
  );
  
  // get project
  export const getUserAppFeatures = (
    async (UserId : string | null | undefined): Promise<IRoutesState[]> =>  {
      try {
  
        const response = await axiosInstance.get(`/cms/getUserAppFeatures?userId=${UserId}`);
        return response.data;
      } catch (error) {
        throw new Error("Something went wrong!!!");
      }
    }
  );
  
  
  export const logoutUser = () => {
    return axiosInstance.get('/cms/logout')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // Handle exceptions here, for example:
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);
        }
  
        // You can choose to re-throw the error to let the component handle it as well
        throw error;
      });
  };

  export const addClaimApplication = (data: any): Promise<AxiosResponse> => {
    return axiosInstance.post("/cms/saveclaimapplication/", data);
  };
  export const UpdateClaimApplication = (data: any): Promise<AxiosResponse> => {
    return axiosInstance.post("/cms/updateclaimapplication/", data);
  };
  export const GetClaimStatusHistory = (): Promise<AxiosResponse> => {
    return axiosInstance.get("/cms/getclaimstatushistory/");
  };
  export const SaveClaimStatus = (data: any): Promise<AxiosResponse> => {
    return axiosInstance.post("/cms/saveclaimstatus/", data);
  };
  export const GetUserClaimApplicationHistory = (UserId : string): Promise<AxiosResponse> => {
    return axiosInstance.get(`/cms/getuserclaimapplicationshistory/?UserId=${UserId}`);
  }
  export const GetNewClaimApplications = (): Promise<AxiosResponse> => {
    return axiosInstance.get("/cms/getnewclaimapplications/");
  };
  export const GetUserNewAndRejectedClaims = (UserId : string): Promise<AxiosResponse> => {
    return axiosInstance.get(`/cms/getnewandrejectedclaims/?UserId=${UserId}`);
  }
  export const GetAllClaimTypes = (): Promise<AxiosResponse> => {
    return axiosInstance.get("/cms/getallclaimtypes/");
  };
  export const GetEntireClaimTypes = (): Promise<AxiosResponse> => {
    return axiosInstance.get("/cms/getentireclaimtypes/");
  };
  export const SaveClaimType = (data: any): Promise<AxiosResponse> => {
    return axiosInstance.post("/cms/saveclaimtype/", data);
  };
  export const UpdateClaimTypes = (data: any): Promise<AxiosResponse> => {
    return axiosInstance.post("/cms/updateclaimtype/", data);
  };