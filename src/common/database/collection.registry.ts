import { User, UserSchema } from './collections/user.schema';
import { Board, BoardSchema } from './collections/board.schema';
import { List, ListSchema } from './collections/list.schema';
import { Card, CardSchema } from './collections/card.schema';

export const CollectionRegistry = [
  { name: User.name, schema: UserSchema },
  { name: Board.name, schema: BoardSchema },
  { name: List.name, schema: ListSchema },
  { name: Card.name, schema: CardSchema },
];
