import jokesReducer, {
  initialState,
  addToFavorites,
  removeFromFavorites,
  likeJoke,
  dislikeJoke,
  getJokes,
  JokesState,
} from "@/store/jokes-slice";
import { mockData, mockListData } from "@/mock";

describe("jokesReducer", () => {
  it("should return the initial state if an empty action is passed", () => {
    const result = jokesReducer(undefined, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("should add a favorite joke using the 'addToFavorites' action", () => {
    const action = { type: addToFavorites.type, payload: mockData.id };
    const mockState = { ...initialState, jokes: { [mockData.id]: mockData } };
    const result = jokesReducer(mockState, action);

    expect(result.favoriteJokes[mockData.id].id).toBe(mockData.id);
    expect(result.favoriteJokes[mockData.id].isLiked).toBe(false);
    expect(result.favoriteJokes[mockData.id].isDisliked).toBe(false);
  });

  it("should remove a favorite joke using the 'removeFromFavorites' action", () => {
    const addToFavoritesAction = {
      type: addToFavorites.type,
      payload: mockData.id,
    };
    const mockState = { ...initialState, jokes: { [mockData.id]: mockData } };
    const addResult = jokesReducer(mockState, addToFavoritesAction);
    const removeFromFavoritesAction = {
      type: removeFromFavorites.type,
      payload: mockData.id,
    };
    const removeResult = jokesReducer(addResult, removeFromFavoritesAction);

    expect(removeResult.favoriteJokes).not.toHaveProperty(`${mockData.id}`);
  });

  it("should like a favorite joke using the 'likeJoke' action", () => {
    const addToFavoritesAction = {
      type: addToFavorites.type,
      payload: mockData.id,
    };
    const mockState = { ...initialState, jokes: { [mockData.id]: mockData } };
    const addResult = jokesReducer(mockState, addToFavoritesAction);
    const likeJokeAction = {
      type: likeJoke.type,
      payload: mockData.id,
    };
    const likeResult = jokesReducer(addResult, likeJokeAction);

    expect(likeResult.favoriteJokes[mockData.id].isLiked).toBe(true);
    expect(likeResult.favoriteJokes[mockData.id].isDisliked).toBe(false);
  });

  it("should dislike a favorite joke using the 'dislikeJoke' action", () => {
    const addToFavoritesAction = {
      type: addToFavorites.type,
      payload: mockData.id,
    };
    const mockState = { ...initialState, jokes: { [mockData.id]: mockData } };
    const addResult = jokesReducer(mockState, addToFavoritesAction);
    const dislikeJokeAction = {
      type: dislikeJoke.type,
      payload: mockData.id,
    };
    const dislikeResult = jokesReducer(addResult, dislikeJokeAction);

    expect(dislikeResult.favoriteJokes[mockData.id].isLiked).toBe(false);
    expect(dislikeResult.favoriteJokes[mockData.id].isDisliked).toBe(true);
  });

  it("should change the loading state using the 'getJokes.pending' action", () => {
    const action = { type: getJokes.pending.type };
    const result = jokesReducer({ ...initialState }, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should fetch jokes using the 'getJokes.fulfilled' action", () => {
    const action = { type: getJokes.fulfilled.type, payload: mockListData };
    const result = jokesReducer({ ...initialState }, action);
    const jokes = mockListData.reduce(
      (acc, item) => {
        acc[item.id] = item;
        return acc;
      },
      {} as JokesState["jokes"],
    );

    expect(result.jokes).toEqual(jokes);
    expect(result.loading).toBe(false);
  });

  it("should change the loading state and error state using the 'getJokes.rejected' action", () => {
    const action = {
      type: getJokes.rejected.type,
      payload: "500. Something went wrong",
    };
    const result = jokesReducer({ ...initialState }, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe("500. Something went wrong");
  });
});
