

/**
 * Clash Of Clans
 */
interface cocClans {
	items: {
		tag: string;
		name: string;
		type: string;
		badgeUrls: {
			small: string;
			large: string;
			medium: string;
		};
		clanLevel: number;
		clanPoints: number;
		clanVersusPoints: number;
		requiredTrophies: number;
		warFrequency: string;
		warWinStreak: number;
		warWins: number;
		warTies?: number;
		warLosses?: number;
		isWarLogPublic: boolean;
		warLeague?: {
			id: number;
			name: string;
		};
		members: number;
		labels: {
			id: number;
			name: string;
			iconUrls: {
				small: string;
				medium: string;
			};
		}[];
	}[];
	paging: {
		cursors: {
			after?: string;
			before?: string;
		};
	};
}

interface cocClanMember {
	name: string;
	tag: string;
	role: 'member' | 'admin' | 'coLeader' | 'leader';
	expLevel: number;
	league: {
		id: number;
		name: string;
		iconUrls: {
			small: string;
			tiny: string;
			medium: string;
		};
	};
	trophies: number;
	versusTrophies: number;
	clanRank: number;
	previousClanRank: number;
	dontaions: number;
	donationsReceived: number;
}

interface cocClanMembers {
	items: cocClanMember[];
	paging: {
		cursors: {
			after?: string;
			before?: string;
		};
	};
}

interface cocClan {
	tag: string;
	name: string;
	type: string;
	description: string;
	location?: {
		localizedName: string;
		id: number;
		name: string;
		isCountry: boolean;
		countryCode: string;
	};
	badgeUrls: {
		small: string;
		large: string;
		medium: string;
	};
	clanLevel: number;
	clanPoints: number;
	clanVersusPoints: number;
	requiredTrophies: number;
	warFrequency: string;
	warWinStreak: number;
	warWins: number;
	warTies?: number;
	warLosses?: number;
	isWarLogPublic: boolean;
	warLeague?: {
		name: string;
		id: number;
	};
	members: number;
	labels: {
		id: number;
		name: string;
		iconUrls?: {
			small: string;
			medium: string;
		};
	}[];
	memberList: cocClanMember[];
}

interface cocPlayer {
	name: string;
	tag: string;
	townHallLevel: number;
	townHallWeaponLevel?: number;
	expLevel: number;
	trophies: number;
	bestTrophies: number;
	warStars: number;
	attackWins: number;
	defenseWins: number;
	builderHallLevel?: number;
	versusTrophies?: number;
	bestVersusTrophies?: number;
	versusBattleWins?: number;
	role?: string;
	donations: number;
	donationsReceived: number;
	clan?: {
		tag: string;
		name: string;
		clanLevel: number;
		badgeUrls: {
			small: string;
			large: string;
			medium: string;
		};
	};
	league?: {
		id: number;
		name: string;
		iconUrls: {
			small: string;
			tiny: string;
			medium: string;
		};
	};
	achievements: {
		name: string;
		stars: number;
		value: number;
		target: number;
		info: string;
		completionInfo: string | null;
		village: 'home' | 'builderBase';
	}[];
	labels: {
		id: number;
		name: string;
		iconUrls: {
			small: string;
			medium: string;
		};
	}[];
	troops: {
		name: string;
		level: number;
		maxLevel: number;
		village: 'home' | 'builderBase';
	}[];
	heroes: {
		name: string;
		level: number;
		maxLevel: number;
		village: 'home' | 'builderBase';
	}[];
	spells: {
		name: string;
		level: number;
		maxLevel: number;
		village: 'home' | 'builderBase';
	}[];
}

interface cocWarClan {
	tag: string;
	name: string;
	badgeUrls: {
		small: string;
		large: string;
		medium: string;
	};
	clanLevel: number;
	attacks: number;
	stars: number;
	destructionPercentage: number;
	expEarned?: number;
	members: {
		tag: string;
		name: string;
		mapPosition: number;
		townhallLevel: number;
		opponentAttacks: number;
		bestOpponentAttack?: {
			order: number;
			attackerTag: string;
			defenderTag: string;
			stars: number;
			destructionPercentage: number;
		};
		attacks?: {
			order: number;
			attackerTag: string;
			defenderTag: string;
			stars: number;
			destructionPercentage: number;
		}[];
	}[];
}

interface cocWar {
	state: 'notInWar' | 'preparation' | 'inWar' | 'warEnded';
	teamSize: number;
	startTime: string;
	preparationStartTime: string;
	endTime: string;
	clan: cocWarClan;
	opponent: cocWarClan;
}

interface cocCWL {
	state: 'notInWar' | 'preparation' | 'inWar' | 'warEnded';
	season: string;
	clans: {
		name: string;
		tag: string;
		clanLevel: number;
		badgeUrls: {
			small: string;
			large: string;
			medium: string;
		};
		members: {
			name: string;
			tag: string;
			townHallLevel: number;
		}[];
	}[];
	rounds: {
		warTags: string[];
	}[];
}
