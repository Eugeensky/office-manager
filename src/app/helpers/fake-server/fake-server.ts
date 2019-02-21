import { User, AuthUser } from 'src/app/models/user/user';

export class FakeServer {
    private static fakeUserStorage:Array<AuthUser> = [
        {login:'admin',password:'admin',token:'adminfaketoken228'},
        {login:'sasha',password:'sasha',token:'sashafaketoken228'},
        {login:'pasha',password:'pasha',token:'pashafaketoken228'}
      ]
      
    public static GetRegisteredUserToken(user:User):string{
        let findedUser = this.fakeUserStorage.find(x=>x.login == user.login && x.password == user.password);
        if(findedUser){
            return findedUser.token;
        }
        return null;
    }
}
