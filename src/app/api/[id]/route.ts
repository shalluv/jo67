import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const GET = async (
	_req: NextRequest,
	{ params: { id } }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		const url = process.env.DATA_URL;
		if (!url) {
			throw new Error('Invalid URL');
		}

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await res.json();

		const dataById = data.find((item: { id: string }) => item.id === id);

		if (!dataById) {
			throw new Error('Data not found');
		}

		return NextResponse.json(dataById);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					error: error.message,
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(
			{
				error: 'Failed to fetch',
			},
			{
				status: 500,
			}
		);
	}
};
