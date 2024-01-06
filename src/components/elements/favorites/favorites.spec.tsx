import React from 'react';
import * as reduxHooks from 'react-redux';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Favorites from './';
import { initialState } from '@/store/jokes-slice';
import { mockData } from '@/mock';

jest.mock('react-redux');

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');

mockedUseSelector.mockReturnValue(initialState);

describe('Favorites', () => {
  it("should render with a child element whose class is equal to 'joke-list'", () => {
    render(<Favorites onCloseFavorites={() => {}} />);

    expect(screen.getByRole('list')).toHaveClass('joke-list');
  });

  it("should render with a button whose class is equal to 'favorites__heart-button'", () => {
    const { container } = render(<Favorites onCloseFavorites={() => {}} />);

    expect(container.getElementsByClassName('favorites__heart-button').length).toBe(1);
  });

  it("should render with a button with the 'onCloseFavorites' callback, which works correctly", async () => {
    const mockCallback = jest.fn();

    render(<Favorites onCloseFavorites={mockCallback} />);

    await userEvent.click(screen.getByRole('button'));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should render with a class equal to 'favorites' and 'favorites_mock'", () => {
    render(<Favorites className="favorites_mock" onCloseFavorites={() => {}} />);

    expect(screen.getByRole('complementary')).toHaveClass('favorites');
    expect(screen.getByRole('complementary')).toHaveClass('favorites_mock');
  });

  describe('Joke', () => {
    const mockState = {
      ...initialState,
      favoriteJokes: {
        [mockData.id]: { ...mockData, isLiked: false, isDisliked: false },
      },
    };

    it("should render with the passed 'Like' button whose class is equal to 'joke__like-button' and 'joke__like-button_filled'", () => {
      mockedUseSelector.mockReturnValue({
        ...mockState,
        favoriteJokes: {
          [mockData.id]: { ...mockData, isLiked: true, isDisliked: false },
        },
      });

      const { container } = render(<Favorites onCloseFavorites={() => {}} />);

      expect(container.getElementsByClassName('joke__like-button').length).toBe(1);
      expect(container.getElementsByClassName('joke__like-button_filled').length).toBe(1);
    });

    it("should render with the passed 'Like' button with the 'onLikeJoke' callback, which works correctly", async () => {
      const mockCallback = jest.fn();
      mockedUseSelector.mockReturnValue(mockState);
      mockedDispatch.mockReturnValue(mockCallback);

      const { container } = render(<Favorites onCloseFavorites={() => {}} />);

      await userEvent.click(container.getElementsByClassName('joke__like-button')[0]);

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({
        payload: mockData.id,
        type: 'jokes/likeJoke',
      });
    });

    it("should render with the passed 'Dislike' button whose class is equal to 'joke__dislike-button' and 'joke__dislike-button_filled'", () => {
      mockedUseSelector.mockReturnValue({
        ...mockState,
        favoriteJokes: {
          [mockData.id]: { ...mockData, isLiked: false, isDisliked: true },
        },
      });

      const { container } = render(<Favorites onCloseFavorites={() => {}} />);

      expect(container.getElementsByClassName('joke__dislike-button').length).toBe(1);
      expect(container.getElementsByClassName('joke__dislike-button_filled').length).toBe(1);
    });

    it("should render with the passed 'Dislike' button with the 'onDislikeJoke' callback, which works correctly", async () => {
      const mockCallback = jest.fn();
      mockedUseSelector.mockReturnValue(mockState);
      mockedDispatch.mockReturnValue(mockCallback);

      const { container } = render(<Favorites onCloseFavorites={() => {}} />);

      await userEvent.click(container.getElementsByClassName('joke__dislike-button')[0]);

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({
        payload: mockData.id,
        type: 'jokes/dislikeJoke',
      });
    });

    it("should render with the passed 'Delete' button whose class is equal to 'joke__delete-button'", () => {
      mockedUseSelector.mockReturnValue(mockState);

      const { container } = render(<Favorites onCloseFavorites={() => {}} />);

      expect(container.getElementsByClassName('joke__delete-button').length).toBe(1);
    });

    it(
      "should render with the passed 'Delete' button with the 'onRemoveFromFavorites' callback, which works" +
        ' correctly',
      async () => {
        const mockCallback = jest.fn();
        mockedUseSelector.mockReturnValue(mockState);
        mockedDispatch.mockReturnValue(mockCallback);

        const { container } = render(<Favorites onCloseFavorites={() => {}} />);

        await userEvent.click(container.getElementsByClassName('joke__delete-button')[0]);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith({
          payload: mockData.id,
          type: 'jokes/removeFromFavorites',
        });
      }
    );
  });
});
