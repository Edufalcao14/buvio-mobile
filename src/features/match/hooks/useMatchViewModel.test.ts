import { renderHook, act } from "@testing-library/react-native";
import { useMatchViewModel } from "./useMatchViewModel";

describe("useMatchViewModel", () => {
  it("starts with the modal closed", () => {
    const { result } = renderHook(() => useMatchViewModel());

    expect(result.current.modalVisible).toBe(false);
  });

  it("opens and closes the modal", () => {
    const { result } = renderHook(() => useMatchViewModel());

    act(() => result.current.handleModalOpen());
    expect(result.current.modalVisible).toBe(true);

    act(() => result.current.handleModalClose());
    expect(result.current.modalVisible).toBe(false);
  });
});
