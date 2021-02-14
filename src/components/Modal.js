import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import AddForm from "./AddForm";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANDQ0PDw4NDQ0NEA0ODREQEA8QDw4QFhEXFhURFRMZHSggGRolHRMVITEhKDU3Ly4uFx84OD8sNyg5LisBCgoKDg0OGhAQGzEiHiAtKy0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLSstLS0rLS0tLS0rLS0tLS0tLS0tLS0tLf/AABEIAMgAyAMBEQACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAAAAQYDBAUC/8QAORAAAgECAgYGCQMEAwAAAAAAAAECAxEEBgUSITFBcjNRcYGywRMiIzRSYYKR0UJisRYy4fBjkqH/xAAbAQEBAAMBAQEAAAAAAAAAAAAAAQMEBQIGB//EACoRAQACAQMEAgECBwAAAAAAAAABAgMEESEFMTJBEjMiE3EUFUJRUmGR/9oADAMBAAIRAxEAPwD3ztPzkAFAKFUCAVABRQuwVQCAAAFAgUAFUAFUCgAAUUwNcAFUChUAqAAKVdgKFEAAAKBAAUAFUChVAgFAIUfRha4FCgACoAKKF2CqAQAAAoECgAqgAqgUAACgAAphYAKFQAgUApV2AoUQAAAoEABQAVQKFUCAUAhRQBRTCwAAKgASR/tSrtMhJ3OQ9dyN5QKAAKBAoAKoAKoFAe9wd+yb8TAVQAUAAFMLAAQKAUq7b8u3gNHzxDmqdnKCUrN2vfqZiyZoo29Ppb594o4MRQnSlqzjKEupq3eutHumSLQx5cGTFO1ocR6YZiPQUAKBAAUAFUChVAjlw+HnVlq04SnLqS/l8EeLZIpHLNjwZMvFYc2kNHzwzgqllKacrLbaz6zzizRknhl1Glvg2+TpmZqqAKAECvowsCACihQe1aHJnTVeSPiNLWdod3onlZqcThYVY6tSEZx6mkzRrea+L6DJhpkja0M7pDKq2yoStv8AUntXYpbzbx6uY8nF1PR4nnGzuKwlSjLVqQlB8L7n2M3aZa37OJl02THP5w4TKwbIQ3ByBVABXqNgJDnwmDqVnanCU3xtuXazHfLWndsYdNkyztENHo/KqVpV5X/ZBtLvlvNHLrJ/pdvT9IiOcjQ4bDQpR1YRjCPUlY0rXm08uxjw1xx+LK506ajyS8R0dF7cDrO82ruzx0HEAAVAAFMLAAUqgULHcaHJfTVeSPiNHWdod3onlZsDnvpf3AnDirUY1IuM4qUXvTSaZYtMcw8ZMdckbWh4GkMrQld0Zaj+GV3Hs60bePVzHFnI1HSK25pwzWNwFWg7VIOK4S3xf1G7TNW3ZxM+ky4vKHWM3PpqzyAA9bO1gtHVa79nByXGW6C+oxXz0o2sOjyZu0NLo/K0IWdaXpH8K2Q/LNHJq7T4u3p+k0pzfl79KlGC1YRjFLckkkak2tPd1qY60jasbOQj1wBWPzp01Lkl4jo6LtL53rO/yqzp0XDAIFAAVTE11ChVAIBosl9NV5I+I0tb6d3onlZsDnPpWU01perh8XJQd4asG4S2x4/Y3cOCL0cHW66+DPtDv6PzLRq2U/Yz/d/a/q/Jjy6a1W1p+qYsnFuJe1GV9qs0zWmHSrb5cxKVKakmpJNPemk0yxMwWpW0bTDwtIZYp1Luk/RS6t8H3cDax6q1fJytT0ql+acPD/p3E+k1NSKXx63qdvWbX8XXbdyv5Tm+fZ7uj8s0qdnU9rPqeyC+nj3mpk1VrdnX0/S8Veb8y9yEFFWSSS4LYjVmZnu6VaxXiqykkrtpFiFm0V5l4mkMy0aV1D20v2/2r6vwbGPS2vPLm6jqmPHxXmXR0LpiticXFTklDVm9SKtHh9zLmwVx0a2j1uTNm57NYaLusdnTpqXJLxHS0Pt871nyqzp0HEQAFAAH0YmAChRABRosl9NV5I+I0Nb6d3onlZsDnvpWFzX73Lkh5nU0vhD5Pq+/67xzb/dy93cwOk62Hfs5tLjF7YPu4GLJgpfu28Gty4u0tJo/NFOdlWi6UviV3D/Bo5NJavjy7mn6rS/F+HvUqsZpSjJST3NNNPvNSazHd1qZK2jeJchNntx1akYJylJRS3ttJIu0z2eLXrSN7Ts8HSGaKcLqjF1ZfE7qH+Tax6S0+Tlajq2OnFOWax+k62IftJtrhFbILu4nQpgpTs4mfWZsveXUM0NTd7GVPe48k/I09Z4cup0n7m7OU+qY7OvTUuSXiOlofb53rPlVnDoOIAAoAKPoxMIBAAAvsaLJfTVeSPiNDWdod7onlZsDnvpGFzX73Lkh5nU0nhD5Pq/3vHNtywAWN/b1EbuxhMZUou9OcodaX9r7YmK+Gtu7Ph1OXFP4y9n+q6upb0cPSfFd6tuU1v4KN+7p/wA5tEbbc/3eNi8ZUru9ScpvhfcuyJs48NaQ5mbU5Ms/lLrmZgAA9nt7GVPe48lTyNTWeDqdJ+5uzkvqmOzr01Hkl4jpaH2+d6z5VZw6DigAAUCK+jGwIAAFFHtWhyX01Xkj/JoaztDu9E8rNgc99Iwua/fJckPM6mk8IfJ9X+945tuWBQvIBQBcvAgFAD2e3sZU97jyVPI1NZ4Op0n7m7OS+qY7OvTUeSXiOlofb53rPlVnDoOKACgQCvSmJrgACgQe1aLJfTVeSPiNHWdod3ovlZsDnvpGFzX75Lkh5nV0nhD5Tq33vHNtywKAABRAKUAA9nt7GU/fI8lTyNPWeDq9K+5ujkvqWOzp01Hkl4jpaD2+e6x5VZ06DiBQABQqqYWuAUCAB7Vosl9NV5I+I0dZ2h3ei+VmwOe+kYXNfvcuSn5nV0fhD5Tq33vHNtzAIBQCFFAFAKg9nt7OU/e48lTyNPWeDqdK+5ujkvqWOzp01Hkl4jpaD2+e6x5VZ06LiBAKoVQgpia6gQKAC+1534aLJfTVuSPiNDW+nd6LxNmwOe+jZrMGg6lao6tNxk9WKcHsey+595u6bURj7uJr+n2yz8q92WrUZU5as4yhLqkmvt1nRrkrbxcDJivjn8ocZ6jlj5kKiDkUqgAhyhXqH3SpynJRjFyk9ySbf2PFrxXmXumO152rDUZc0JVpVVWqasfVklDfLbba3wOdqdRW/EO907QXxT87tQaLt92Ozp01Hkl4jpaDfl891ifyrszp0XFBChQIIUfZha6AAoUBPdeYerl7SMMNVk5qWrOKjdK+rtNbU4ZtEbOn03VVwWn5e21wuLhWjrU5xmvk9xy70tWeX1GPNTLG9Zdg8srgxWFhVjq1IRnHqaPVbzXsxZMNMkbWjdndIZVW10J2/ZO7XYpbzcx6uf6nH1PSInnH/wAZ3F4OpRdqkJQfC+59jN6matuzi5tNlxT+UOAyzv6Ye4VAK5MPh51ZatOEpy6km+9vgeL5Yp5MuPBkyTxG7Q6PyrJ2lXlqr4Ib++RoZNZ/i7ODpO8b3aTB4KnQjanCMFxstr7XxNK+S153tLs4sGPFG1YdkxzyzOnjtJUsOvaTSfBb5PsRlpiteeGvl1VMXeWL07pJYqpGUYuMYRcVe13d77HV0uGccTu+b12qrmtw8w2oaIUCCFAD6MLAACqACqBXJRrSpy1oSlCXXFtd3zR4tSLeTJjzXxzvE7NBo/NMo2jXjrr442Uu+JpZNHv4uzp+rTHF2kwePpV1enOM+vbtXat5pXx2p3drFqMeSPxl2jwzuOrSjOLjKKlF700mmX5TXmHi1IvG1mKzLg6NCpGNJNSavON7xiuH+/I6ukve3MvmupYceOdqPNwuEqVpWpwlN8bbl2vgZ8matO7Qw6bJlnaIaPR+VUrSryv+yF0uxy3mjl1kz4u3p+kxHORocNhoUo6tOEYR6kkjSte1u7r48VKRtWHOeWSXmY/TlChdOetNfphtff1GbHp75Glm1+LF75ZrH5krVbqFqMPltn/24HQx6Ote/LjZ+qZL+PEPFlJttttt722233m1FYhzbXme6HuHmAqhBCgAKr6MDXABVAoVQIDudwbLz6fVKpKDUoycZLc02n9yWpWe73jyWxzvWXvaPzRUhaNZelj8Ssp/bczSy6SO9XZ03VbRxflrFU1oayTu43UX6r3bn1HO22nZ3ot8q7w8ahl1TqSq4mXpZybk4q6gvlfe1+DYnUzEfGvDn16f8rfLJy9ujSjBKMIxjFbkkkvsa82tPd0aY60jasOQj1w62PxMaFKdSW6Cb7XwR7x1m07MWfLGOk2lh8fpyvXunLUg/wBMLr7vezrYtLWsby+Y1GvyZJ2idoeabURDRm2/cJschdjYKoQQoAABVfRhYAAVQKAABRAKJge9lfRfpZ+lmvZ036q+Oa8kaWrzRH41dnpuj+dv1LdvTZSaSu9iRzOZfRzPxjns8XH5lo0naF60lv1baq+o2Meltdz8/U8WOdq8y9PA4yFeCnTd4v7p9TMN6TSdpbmDNTLX5Q7J4ZmWznjOjop/8k+z9K+/8HQ0OPn5OH1bPERFIZU6b5+O4AD0FAghQAFUAFV9GBrgUKoEAoBCigdnAYV1qijfVjvqSdrQjxZjyX/TjeGzpsX6mTaezR4jMFHDwVLDx9JqrVi90F38Tn101sk72du/UMWCvwx+mex+lK2I6Sb1fhXqxXdxN7Hp6U7OPn1mXL3l0zO1d3d0XpGeGqa0dsXbXjwkvyYc2CuSrb0uqthtx2bnCaQp1qXpYy9VK8r742V2mce2OaztL6jHqaZKfKGC0hinXrVKj/W3b5R4f+I7WGnwpEPlNVlnLlmzrGVrx/YChVCCFAAAKoAKr6MLABQAAKIBSgBb7LcHa/du2Hl63fJUCqACk7enLSrzgpqMnFVE4zS4rs/3ezxbFEstM1qxtDiPbEBQqhBCgAKoAKoAA+jCwgQCgEKKAKAEChAKoAKcBOQKoVQghQAACqACqAAr6MLAACiAUoAAqAAoAAFAAFCqEEKAAqgAqgAKAAPowsABCigCgBAoACgAoEAqhVCCFAAAKoAKoACgAD6MTAgFAFACBQAFABQIoeoUAEEKAAqgAqgAAFAAAK//2Q=="
                alt="camera"
              />
              <ModalContent>
                <AddForm />
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
