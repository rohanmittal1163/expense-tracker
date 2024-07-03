import React, { useReducer, useState } from 'react';
import '../output.css';

const ACTION = {
	ADD_TRANSACTION: 'add_transaction',
	FILTER_TRANSACTION: 'filter_transaction',
};
function reducer(state, { type, payload }) {
	switch (type) {
		case ACTION.ADD_TRANSACTION:
			if (
				payload.info.amount === null ||
				payload.info.desc === '' ||
				payload.info.type === ''
			) {
				return state;
			}
			return {
				data: [...state.data, payload.info],
				expense:
					payload.info.type == 'Expense'
						? state.expense + +payload.info.amount
						: state.expense,
				income:
					payload.info.type == 'Income'
						? state.income + +payload.info.amount
						: state.income,
			};
		case ACTION.FILTER_TRANSACTION:
			return { ...state };
	}
}

function ExpenseTracker() {
	const [hidden, setHidden] = useState(true);
	const [{ expense, income, data }, dispatch] = useReducer(reducer, {
		expense: 0,
		income: 0,
		data: [],
	});

	const [info, setInfo] = useState({ amount: 0, desc: '', type: '' });
	const [search, setSearch] = useState('');

	return (
		<div className="flex flex-col gap-5 p-10 w-[500px] h-auto ">
			<p className="font-bold text-2xl text-center">Expense Tracker</p>
			<div className="flex flex-row items-center justify-between">
				<p className="font-bold">Balance : {income - expense}$</p>
				<button
					className="text-white bg-slate-950 rounded-md px-4 py-2 text-sm hover:bg-slate-800"
					onClick={() => {
						setHidden(!hidden);
					}}
				>
					{hidden ? 'Add' : 'Cancel'}
				</button>
			</div>
			{hidden ? (
				''
			) : (
				<div className="border-2 border-slate-200 rounded-md border-solid w-full p-4 flex flex-col gap-4">
					<input
						value={info.amount}
						min="1"
						type="number"
						onChange={(e) => {
							setInfo((prev) => {
								return { ...prev, amount: e.target.value };
							});
						}}
						placeholder="Amount"
						className="border-solid border-gray-200 border-2 px-4 py-2 text-sm outline-0 rounded-md"
					/>
					<input
						value={info.desc}
						onChange={(e) => {
							setInfo((prev) => {
								return { ...prev, desc: e.target.value };
							});
						}}
						type="text"
						placeholder="Description"
						className="border-solid border-gray-200 border-2 px-4 py-2 text-sm outline-0 rounded-md"
					/>
					<div className="flex flex-row text-sm gap-3 ">
						<input
							type="radio"
							id="exp"
							name="a"
							value={'Expense'}
							onClick={(e) => {
								setInfo((prev) => {
									return { ...prev, type: e.target.value };
								});
							}}
						></input>
						<label htmlFor="exp">Expense</label>
						<input
							type="radio"
							id="inc"
							name="a"
							value={'Income'}
							onClick={(e) => {
								setInfo((prev) => {
									return { ...prev, type: e.target.value };
								});
							}}
						></input>
						<label htmlFor="inc">Income</label>
					</div>
					<button
						className="capitalize text-white bg-slate-950 rounded-md px-4 py-2 text-sm hover:bg-slate-800"
						onClick={() => {
							dispatch({
								type: ACTION.ADD_TRANSACTION,
								payload: { info },
							});
							setInfo({ amount: 0, desc: '', type: '' });
						}}
					>
						add transaction
					</button>
				</div>
			)}
			<div className="flex items-center justify-between gap-5">
				<div className="border-2 border-slate-200 rounded-md border-solid w-full p-4 flex flex-col gap-1">
					<p className="text-sm text-slate-600">Expense</p>
					<p className="text-red-700 font-bold">${expense}</p>
				</div>
				<div className="border-2 border-slate-200 rounded-md border-solid w-full p-4 flex flex-col gap-1">
					<p className="text-sm text-slate-600">Income</p>
					<p className="text-green-700 font-bold">${income}</p>
				</div>
			</div>
			<div className="flex flex-col gap-4 text-sm">
				<p className="font-bold">Transactions</p>
				<input
					type="text"
					placeholder="search"
					className="bg-gray-200 border-0 outline-0 p-2 px-5 rounded-full"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						dispatch({ type: ACTION.FILTER_TRANSACTION, payload: search });
					}}
				></input>
				{data.map((value, index) => {
					return (
						<div
							key={index}
							className={`flex flex-row items-center justify-between p-2 border-2 border-solid rounded-md border-r-4 ${
								value.type === 'Expense'
									? 'border-r-red-300'
									: 'border-r-green-400'
							} `}
						>
							<p>{value.desc}</p>
							<p>${value.amount}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ExpenseTracker;
