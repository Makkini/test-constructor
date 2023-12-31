import {memo, useCallback} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';

import cls from './LoginForm.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {loginActions} from '../../model/slice/loginSlice';
import {getLoginState} from '../../model/selectors/getLoginState/getLoginState';
import {loginByUsername} from '../../model/services/loginByUsername/loginByUsername';
import {Text, TextTheme} from '@/shared/ui/Text/Text';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}


const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {

    const dispatch = useDispatch();
    const {email, password, error, isLoading} = useSelector(getLoginState);
    const onChangeUsername = useCallback((value: string)=> {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string)=> {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await dispatch(loginByUsername({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            dispatch(loginActions.setPassword(''));
            dispatch(loginActions.setUsername(''));
        }
    }, [onSuccess, dispatch, email, password]);

    return (

        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={'Форма авторизации'} />
            {error && <Text text={'Неверный логин или пароль'} theme={TextTheme.ERROR}/>}
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={'Введите имя пользователя'}
                onChange={onChangeUsername}
                value={email}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={'Введите пароль'}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {'Войти'}
            </Button>
        </div>
    );
});

export default LoginForm;
