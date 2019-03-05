import {
	getUser,
	getAddressList,
	findCart,
	cartProductCount
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS,
	GETCARTS,
	GETCARTNUM
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	async saveAddress({
		commit,
		state
	}) {

		if(state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);	
	},
	async getCarts({
		commit,
		state
	}) {
		let carts = await findCart(1, 100);
		carts = carts.data.cart;
		commit(GETCARTS, carts);	
	},
	async getCartNum({
		commit,
		state
	}) {
		let num = await cartProductCount();
		num = num.data;
		commit(GETCARTNUM, num);	
	},
}