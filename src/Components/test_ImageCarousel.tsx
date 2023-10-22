import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {ImageCarousel} from './ImageCarousel';

jest.mock('axios');
jest.mock('react-query');

describe('ImageCarousel', () => {

  it('should update the primary image when the button is clicked', async () => {
    const mockData = {
      message: {
        status: true,
        message: 'Image Updated!',
      },
    };
    const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;
    const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

    mockUseMutation.mockReturnValue([
      {
        isLoading: false,
        isError: false,
        isSuccess: false,
        mutate: jest.fn(),
      },
    ]);

    mockAxiosPost.mockResolvedValueOnce({ data: mockData });

    render(<ImageCarousel />);

    const button = screen.getByRole('button', { name: /update primary image/i });

    fireEvent.click(button);

    await waitFor(() => expect(mockAxiosPost).toHaveBeenCalledTimes(1));

    expect(mockAxiosPost).toHaveBeenCalledWith(
      expect.stringContaining('/api/update_pack_primary_image'),
      expect.objectContaining({
        imageId: expect.any(String),
        modpackId: expect.any(String),
      }),
      expect.objectContaining({
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    await waitFor(() => expect(screen.getByText('Image Updated!')).toBeInTheDocument());
  });
});