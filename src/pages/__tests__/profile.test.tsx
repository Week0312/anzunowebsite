import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../context/AuthContext";
import Profile from "../profile";

const mockUser = {
    id: 1,
    email: "test@example.com",
    username: "testuser",
};

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe("Profile", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders profile form with user data", () => {
        render(
            <AuthProvider>
                <Profile />
            </AuthProvider>
        );

        expect(screen.getByLabelText(/username/i)).toHaveValue(
            mockUser.username
        );
        expect(screen.getByLabelText(/email/i)).toHaveValue(mockUser.email);
    });

    it("updates profile successfully", async () => {
        render(
            <AuthProvider>
                <Profile />
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "newusername" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "newemail@example.com" },
        });

        fireEvent.click(screen.getByText(/update profile/i));

        await waitFor(() => {
            expect(screen.getByText(/updating/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByText(/updating/i)).not.toBeInTheDocument();
        });
    });

    it("shows error message when update fails", async () => {
        jest.spyOn(global, "fetch").mockImplementationOnce(() =>
            Promise.reject(new Error("Failed to update profile"))
        );

        render(
            <AuthProvider>
                <Profile />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText(/update profile/i));

        await waitFor(() => {
            expect(
                screen.getByText(/failed to update profile/i)
            ).toBeInTheDocument();
        });
    });
});
