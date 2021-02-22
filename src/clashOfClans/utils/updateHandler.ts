import { cocEvents } from '../lib/cocEvents';

export function handleClanUpdate(client: cocEvents, clan: cocClan) {
	if (clan.members < 1) return;

	const oldClan: cocClan = client.clans.get(clan.tag);
	client.clans.set(clan.tag, clan);
	if (!oldClan.hasOwnProperty('tag')) return;

	const oldMembers = oldClan.memberList && oldClan.memberList.length ? oldClan.memberList : [];
	const newMembers = clan.memberList && clan.memberList.length ? clan.memberList : [];

	newMembers.forEach((member: cocClanMember) => {
		if (!oldMembers.find((mem: cocClanMember) => mem.tag === member.tag)) client.emit('clanMemberAdd', clan, member);
	});
	oldMembers.forEach((member: cocClanMember) => {
		if (!newMembers.find((mem: cocClanMember) => mem.tag === member.tag)) client.emit('clanMemberRemove', clan, member);
	});

	if (
		clan.name !== oldClan.name
		|| clan.description !== oldClan.description
		|| clan.type !== oldClan.type
		|| clan.badgeUrls.small !== oldClan.badgeUrls.small
		|| !(clan.location && oldClan.location && clan.location.id === oldClan.location.id)
		|| clan.labels.map(d => d.id).join() !== oldClan.labels.map(d => d.id).join()
		|| clan.clanLevel !== oldClan.clanLevel
		|| clan.clanPoints !== oldClan.clanPoints
		|| clan.clanVersusPoints !== oldClan.clanVersusPoints
		|| clan.requiredTrophies !== oldClan.requiredTrophies
		|| clan.warFrequency !== oldClan.warFrequency
		|| clan.warWinStreak !== oldClan.warWinStreak
		|| clan.warWins !== oldClan.warWins
		|| clan.isWarLogPublic !== oldClan.isWarLogPublic
		|| !(clan.warLeague && oldClan.warLeague && clan.warLeague.id === oldClan.warLeague.id)
		|| clan.members !== oldClan.members
		|| (clan.isWarLogPublic && oldClan.isWarLogPublic && clan.warLosses !== oldClan.warLosses)
		|| (clan.isWarLogPublic && oldClan.isWarLogPublic && clan.warTies !== oldClan.warTies)
	) {
		client.emit('clanUpdate', oldClan, clan);
	}

	for (const member of newMembers) {
		const oldMem = oldMembers.find(mem => mem.tag === member.tag);
		if (!oldMem) continue;
		if (
			member.name !== oldMem.name
			|| member.role !== oldMem.role
			|| member.expLevel !== oldMem.expLevel
			|| member.league.id !== oldMem.league.id
			|| member.trophies !== oldMem.trophies
			|| member.versusTrophies !== oldMem.versusTrophies
			|| member.clanRank !== oldMem.clanRank
			|| member.previousClanRank !== oldMem.previousClanRank
			|| member.dontaions !== oldMem.dontaions
			|| member.donationsReceived !== oldMem.donationsReceived
		) {
			client.emit('clanMemberUpdate', clan, oldMem, member);
		}
	}
}

export function handlePlayerUpdate(client: cocEvents, player: cocPlayer) {
	const oldPlayer: cocPlayer = client.players.get(player.tag);
	client.players.set(player.tag, player);
	if (!oldPlayer.hasOwnProperty('tag')) return;

	const oldTroops = oldPlayer.troops;
	for (const hero of oldPlayer.heroes) oldTroops.push(hero);
	for (const spell of oldPlayer.spells) oldTroops.push(spell);

	const newTroops = player.troops;
	for (const hero of player.heroes) newTroops.push(hero);
	for (const spell of player.spells) newTroops.push(spell);

	newTroops.forEach(troop => {
		const oldData = oldTroops.find(trp => trp.name === troop.name);
		if (!oldData || oldData.level !== troop.level) client.emit('playerTroopUpdate', player, oldData, troop);
	});

	const oldAchievements = oldPlayer.achievements;
	const newAchievements = player.achievements;
	for (const achieve of newAchievements) {
		const oldData = oldAchievements.find(ach => ach.name === achieve.name);
		if (oldData && oldData.stars !== achieve.stars) client.emit('playerAchievementUpdate', player, oldData, achieve);
	}

	if (
		oldPlayer.name !== player.name
		|| oldPlayer.townHallLevel !== player.townHallLevel
		|| oldPlayer.townHallWeaponLevel !== player.townHallWeaponLevel
		|| oldPlayer.builderHallLevel !== player.builderHallLevel
		|| oldPlayer.expLevel !== player.expLevel
		|| oldPlayer.trophies !== player.trophies
		|| oldPlayer.bestTrophies !== player.bestTrophies
		|| oldPlayer.versusTrophies !== player.versusTrophies
		|| oldPlayer.bestVersusTrophies !== player.bestVersusTrophies
		|| oldPlayer.warStars !== player.warStars
		|| oldPlayer.attackWins !== player.attackWins
		|| oldPlayer.defenseWins !== player.defenseWins
		|| oldPlayer.versusBattleWins !== player.versusBattleWins
		|| oldPlayer.role !== player.role
		|| oldPlayer.donations !== player.donations
		|| oldPlayer.donationsReceived !== player.donationsReceived
		|| !(oldPlayer.clan && player.clan && oldPlayer.clan.tag === player.clan.tag)
		|| !(oldPlayer.league && player.league && oldPlayer.league.id === player.league.id)
		|| oldPlayer.labels.map(d => d.id).join() !== player.labels.map(d => d.id).join()
	) {
		client.emit('playerUpdate', oldPlayer, player);
	}
}
// @ts-ignore //remove this ignore when editing.
function previousBestAttack(clan: cocWarClan, defenderTag: string, attackerTag: string) {
	const attacks = clan.members.filter(mem => mem.attacks && mem.attacks.length)
		.map(mem => mem.attacks)
		.flat()
		.filter(atk => atk!.defenderTag === defenderTag && atk!.attackerTag !== attackerTag)
		.sort((a, b) => (b!.destructionPercentage ** b!.stars) - (a!.destructionPercentage ** a!.stars));
	return attacks[0];
}

function isFreshAttack(clan: cocWarClan, defenderTag: string, order: number) {
	const attacks = clan.members.filter(mem => mem.attacks && mem.attacks.length)
		.map(mem => mem.attacks)
		.flat()
		.filter(atk => atk!.defenderTag === defenderTag)
		.sort((a, b) => a!.order - b!.order);
	return attacks.length === 1 || attacks[0]!.order === order;
}

export function handleWarUpdate(client: cocEvents, tag: string, war: cocWar) {
	const oldWar: cocWar = client.wars.get(tag);
	client.wars.set(tag, war);
	if (oldWar.hasOwnProperty('state')) return;
	if (war.state === 'notInWar') return;

	if (war.state !== oldWar.state) client.emit('warStateUpdate', oldWar, war);

	for (const member of war.clan.members) {
		const oldMem = oldWar.clan.members.find(mem => mem.tag === member.tag);
		if (!oldMem) continue;
		if (!member.attacks) continue;

		if (!oldMem.attacks && member.attacks.length) {
			for (const attack of member.attacks) {
				const freshAttack = isFreshAttack(war.clan, attack.defenderTag, attack.order);
				client.emit('warAttack', war, Object.assign(attack, { freshAttack }));
			}
		}

		if (oldMem.attacks && oldMem.attacks.length < member.attacks.length) {
			const attack = member.attacks.pop()!;
			const freshAttack = isFreshAttack(war.clan, attack.defenderTag, attack.order);
			client.emit('warAttack', war, Object.assign(attack, { freshAttack }));
		}
	}

	for (const member of war.opponent.members) {
		const oldMem = oldWar.opponent.members.find(mem => mem.tag === member.tag);
		if (!oldMem) continue;
		if (!member.attacks) continue;

		if (!oldMem.attacks && member.attacks.length) {
			for (const attack of member.attacks) {
				const freshAttack = isFreshAttack(war.opponent, attack.defenderTag, attack.order);
				client.emit('warAttack', war, Object.assign(attack, { freshAttack }));
			}
		}

		if (oldMem.attacks && oldMem.attacks.length < member.attacks.length) {
			const attack = member.attacks.pop()!;
			const freshAttack = isFreshAttack(war.opponent, attack.defenderTag, attack.order);
			client.emit('warAttack', war, Object.assign(attack, { freshAttack }));
		}
	}
}
