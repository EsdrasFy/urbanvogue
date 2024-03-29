import axios, { AxiosResponse } from "axios";
import { CreateCommentApiProps, CreateCommentApiReq, CreateCommentResponse } from "./types";

async function CreateCommentApi({
  comment,
  urls,
}: CreateCommentApiProps): Promise<CreateCommentResponse> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<CreateCommentApiReq | null> =
      await axios.post(`${api}comment/create`, {
        comment,
        urls,
      });

    if (response.status === 201 && response.data && response.data) {
      return {
        data: {
          msg: response.data.msg,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          msg: response?.data?.msg || "Unknown error.",
        },
        error: response.data
          ? response.data.msg || "Unknown error."
          : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { CreateCommentApi };
