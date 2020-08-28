import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    > header {
        height: 144px;
        background: #28262e;

        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            
            svg {
                color: #999591;
                width: 24px;
                height: 24px;
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -175px auto 0;

    width: 100%;
    max-width: 700px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        > button {
            background: #ff9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #312e38;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.1s;

            &:hover {
                background: ${shade(0.2, '#ff9000')};
            }
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.1s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }

        input[name=old_password] {
            margin-top: 24px;
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    width: 186px;
    align-self: center;

    img {
        width: 186px;
        height: 186px;

        border-radius: 50%;
    }

    button {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        transition: background-color 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;