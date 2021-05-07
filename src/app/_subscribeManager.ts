interface IUser {
  nome: string;
  email: String;
  birthday: Date;
  age?: number;
}

interface Istatisticas {
  total?: number;
  jovem?: IUser | undefined;
  velho?: IUser | undefined;
}

export class UserSubject {
  public users = [];
  public observables = [];
  public statisticas: Istatisticas;
  constructor() {
    this.users = [];
    this.observables = [];
    this.statisticas = {
      total: 0,
      jovem: undefined,
      velho: undefined,
    };
  }

  public addObservable(observable: any) {
    if (this.observables.includes(observable)) {
      console.error("Ja existe esse observable");
      return;
    }
    console.log("Adicionou observable", observable);
    this.observables.push(observable);
  }

  public removeObservable(observable: any) {
    const index = this.observables.indexOf(observable);
    if (index === -1) {
      console.error("Nao existe");
      return;
    }
    console.log("removeu observable");
    this.observables.splice(index);
  }

  public addUser(user: IUser) {
    this.users.push(user);
    console.log("adicionou user", this.users);
    this.calcEstatisc();
  }

  public removeUser(index: number) {
    this.users.splice(index, 1);
    this.calcEstatisc();
    console.log("removeu user", this.users);
  }

  public notify(): void {
    console.log("esta notificando");
    for (let _observer of this.observables) {
      console.log(`esta notificando o observable`, _observer);
      _observer.update(this);
    }
  }

  private calcEstatisc() {
    if (this.users.length > 0) {
      const total = this.users.length;
      this.users.forEach((user: IUser) => {
        user.age = this.calcAge(user.birthday);
      });

      const { jovem, velho } = this.selecao(this.users);
      this.statisticas = { total, velho, jovem };
      console.log('Estatisticas', this.statisticas)

      this.notify();

    } else {

      this.statisticas = { total: 0, velho: null, jovem: null };
      console.log('Estatisticas', this.statisticas)
      this.notify();

    }
  }

  private selecao(users) {
    const ages = users.map(({ age }) => age);

    const max = Math.max(...ages);
    const min = Math.min(...ages);

    const jovem = users.find(({ age }) => age === min);
    const velho = users.find(({ age }) => age === max);

    return { jovem, velho };
  }

  private calcAge(birthdate) {
    const date = new Date(Date.parse(birthdate));
    return   new Date().getFullYear() - date.getFullYear();
  }
}

export class ListObservable {
  list = [];

  get getList() {
    return this.list;
  }

  public update(_Subject: any) {
    if (_Subject instanceof UserSubject) {
      console.log("Atualizou listagem", _Subject);
      console.log(_Subject);
      this.list = _Subject.users;
    }
  }
}

export class EstaticObservable {
  obj:Istatisticas;

  get getObj() {
    return this.obj;
  }

  public update(_Subject: any) {
    if (_Subject instanceof UserSubject) {
      console.log("Atualizou listagem", _Subject);
      console.log(_Subject);
      this.obj = _Subject.statisticas;
    }
  }
}

