import { Action, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoriteJoke, IJoke } from '@/types/joke';

const API_URL = process.env.API_URL;

export type JokesState = {
  jokes: { [key: number]: IJoke };
  favoriteJokes: {
    [key: number]: IFavoriteJoke;
  };
  loading: boolean;
  error: null | string;
};

export const initialState: JokesState = {
  jokes: {},
  favoriteJokes: {},
  loading: false,
  error: null,
};

export const getJokes = createAsyncThunk<IJoke[], undefined, { rejectValue: string }>(
  'jokes/getJokes',
  async function (_, { rejectWithValue }) {
    const response = await fetch(API_URL + '/jokes/programming/ten');

    if (!response.ok) {
      return rejectWithValue(`${response.status}. ${response.statusText}`);
    }

    return await response.json();
  }
);

const isError = (action: Action): boolean => {
  return action.type.endsWith('rejected');
};

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteJokes[action.payload] = {
        isLiked: false,
        isDisliked: false,
        ...state.jokes[action.payload],
      };
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      delete state.favoriteJokes[action.payload];
    },
    likeJoke: (state, action: PayloadAction<number>) => {
      const isLiked = state.favoriteJokes[action.payload].isLiked;

      if (!isLiked) {
        state.favoriteJokes[action.payload].isDisliked = false;
      }

      state.favoriteJokes[action.payload].isLiked = !isLiked;
    },
    dislikeJoke: (state, action: PayloadAction<number>) => {
      const isDisliked = state.favoriteJokes[action.payload].isDisliked;

      if (!isDisliked) {
        state.favoriteJokes[action.payload].isLiked = false;
      }
      state.favoriteJokes[action.payload].isDisliked = !isDisliked;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getJokes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJokes.fulfilled, (state, action) => {
        state.jokes = action.payload.reduce(
          (acc, item) => {
            acc[item.id] = item;
            return acc;
          },
          {} as JokesState['jokes']
        );
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, likeJoke, dislikeJoke } = jokesSlice.actions;

export default jokesSlice.reducer;
