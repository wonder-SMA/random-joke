import { getJokes } from "@/store/jokes-slice";
import { mockListData } from "@/mock";

global.fetch = jest.fn();

afterEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("jokesThunk", () => {
  it("should fetch jokes using the 'getJokes' action with a resolved response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockListData),
    });
    const dispatch = jest.fn();
    const thunk = getJokes();
    await thunk(dispatch, () => {}, undefined);

    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0].type).toBe("jokes/getJokes/pending");
    expect(dispatch.mock.calls[1][0].type).toBe("jokes/getJokes/fulfilled");
    expect(dispatch.mock.calls[1][0].payload).toBe(mockListData);
  });

  it("should fetch jokes using the 'getJokes' action with a rejected response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Something went wrong",
    });
    const dispatch = jest.fn();
    const thunk = getJokes();
    await thunk(dispatch, () => {}, undefined);

    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[0][0].type).toBe("jokes/getJokes/pending");
    expect(dispatch.mock.calls[1][0].type).toBe("jokes/getJokes/rejected");
    expect(dispatch.mock.lastCall[0].meta.rejectedWithValue).toBe(true);
    expect(dispatch.mock.calls[1][0].payload).toBe("500. Something went wrong");
  });
});
