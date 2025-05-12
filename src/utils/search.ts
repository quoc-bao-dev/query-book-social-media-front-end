export type UserRecommand = {
  id: string;
  userName: string;
  handle: string;
  avatar: string;
};

export type RecommandPayload<T> = {
  type: 'user' | 'post';
  data: T;
};

export type RecommandSearch = {
  type: 'user' | 'post';
  updatedAt: string;
  data: UserRecommand;
};

export const getRecommandedSearch = () => {
  const recommand = !!localStorage.getItem('recommandedSearch')
    ? JSON.parse(localStorage.getItem('recommandedSearch') as string)
    : [];
  return recommand as RecommandSearch[];
};

export const setRecommandedSearch = (
  data: RecommandPayload<UserRecommand | {}>,
) => {
  let recommands = getRecommandedSearch();

  if (data.type === 'user') {
    const findRecommand = recommands.find(
      (item) => item.data.id === (data.data as UserRecommand).id,
    );

    const userRecommand = data.data as UserRecommand;
    const recommand: RecommandSearch = {
      type: 'user',
      updatedAt: new Date().toISOString(),
      data: userRecommand,
    };

    if (!findRecommand) {
      recommands.unshift(recommand);
    } else {
      recommands = recommands.filter(
        (item) => item.data.id !== (data.data as UserRecommand).id,
      );
      recommands.unshift(recommand);
    }
  }

  if (recommands.length > 10) {
    recommands.pop();
  }

  console.log('[recommands] ', recommands);

  localStorage.setItem('recommandedSearch', JSON.stringify(recommands));
};
