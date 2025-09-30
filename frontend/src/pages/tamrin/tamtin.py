cartlist = [
    {'name':'saber', 'age':27},
    {'name':'ali', 'age':30},
    {'name':'hasan', 'age':40}
]


class HandleCartShopping:
    def __init__(self,cartlist):
        self.cart = cartlist
        self.is_find = False

    def set_user_in_list(self):
        self.cart = self.cart.copy()

        for item in self.cart:
            if item['name'] == 'nader':
                self.is_find = True
        if not self.is_find:
            self.cart.append({'name':'nader', 'age':1})
            return self.cart

        newcart = map(self.found_user_in_list,self.cart)
        return (list(newcart))

    def found_user_in_list(self, dict):
        if 'saber' == dict['name'] :
            dict['age'] = dict['age'] +1
            return dict
        else:
            return dict



print(HandleCartShopping(cartlist).set_user_in_list())