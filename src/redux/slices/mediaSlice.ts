import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../../constant';
import {ToastAndroid} from 'react-native';

interface Media {
  userId: string;
  url: string;
  key: string;
  fileType: string;
  createdAt: Date;
}

interface MediaState {
  media: Media[];
  loading: boolean;
  dLoading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
}

const initialState: MediaState = {
  media: [],
  loading: false,
  dLoading: false,
  error: false,
  message: null,
  success: false,
};

export const fetchMedia = createAsyncThunk(
  'media/fetchMedia',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await fetch(`${BASE_URL}/media/get-all/${userId}`);
      const res = await response.json();

      if (!response.ok) {
        return rejectWithValue(res.error);
      }

      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const uploadMedia = createAsyncThunk(
  'media/upload',
  async ({file, userId}: {file: File; userId: string}, {rejectWithValue}) => {
    try {
      console.log({file, userId});

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });

      const response = await fetch(`${BASE_URL}/media/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: '*/*',
          // 'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log({data});
        return rejectWithValue(data.error);
      }
      console.log({data});

      return data;
    } catch (error) {
      console.log({uploadMedia_error: error});

      return rejectWithValue(error.message);
    }
  },
);

export const deleteMedia = createAsyncThunk(
  'media/delete',
  async ({key, userId}: {key: string; userId: string}, {rejectWithValue}) => {
    try {
      const response = await fetch(`${BASE_URL}/media/delete/${key}`, {
        method: 'DELETE',
        body: JSON.stringify({userId}),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    resetState: state => {
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMedia.pending, state => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.data) {
          state.media = action.payload.data;
        } else {
          ToastAndroid.show(action.payload.message, ToastAndroid.LONG);
        }
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      })
      .addCase(uploadMedia.pending, state => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        ToastAndroid.show(action.payload.message, ToastAndroid.LONG);
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      })
      .addCase(deleteMedia.pending, state => {
        state.dLoading = true;
        state.error = false;
        state.message = null;
        state.success = false;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.dLoading = false;
        state.success = true;
        state.message = action.payload.message;
        // console.log(action.payload);
        state.media = state.media.filter(m => m.key !== action.payload.key);
        ToastAndroid.show(action.payload.message, ToastAndroid.LONG);
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.dLoading = false;
        state.error = true;
        // console.log(action.payload);
        // ToastAndroid.show(action.payload, ToastAndroid.LONG);
      });
  },
});

export const {resetState} = mediaSlice.actions;
export default mediaSlice.reducer;
