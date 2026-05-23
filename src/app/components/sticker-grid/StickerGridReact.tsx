import React, { useMemo } from 'react';
import { Sticker, TournamentGroup, TeamGroup } from '../../models/sticker.model';
import { StickerCardReact } from '../sticker-card/StickerCardReact';

interface StickerGridProps {
  stickers: Sticker[];
  collapsedSections: Set<string>;
  collapsedGroups: Set<string>;
  onToggleSection: (section: string) => void;
  onToggleGroup: (group: string) => void;
  onToggled: (id: string) => void;
  onRepeatChanged: (id: string, delta: number) => void;
}

export const StickerGridReact: React.FC<StickerGridProps> = ({ 
  stickers, 
  collapsedSections,
  collapsedGroups,
  onToggleSection,
  onToggleGroup,
  onToggled, 
  onRepeatChanged 
}) => {
  const groupedData = useMemo(() => {
    const tournamentGroupsMap = new Map<string, Map<string, Sticker[]>>();
    
    stickers.forEach((sticker) => {
      if (!tournamentGroupsMap.has(sticker.group)) {
        tournamentGroupsMap.set(sticker.group, new Map());
      }
      const teamsMap = tournamentGroupsMap.get(sticker.group)!;
      if (!teamsMap.has(sticker.section)) {
        teamsMap.set(sticker.section, []);
      }
      teamsMap.get(sticker.section)!.push(sticker);
    });

    const result: TournamentGroup[] = [];
    
    // Sort Groups (A, B, C...) ensuring "FWC" is at the start and "Coca-Cola" is at the end
    const sortedGroupKeys = Array.from(tournamentGroupsMap.keys()).sort((a, b) => {
      if (a === 'FWC') return -1;
      if (b === 'FWC') return 1;
      if (a === 'Coca-Cola') return 1;
      if (b === 'Coca-Cola') return -1;
      return a.localeCompare(b);
    });
    
    sortedGroupKeys.forEach(groupName => {
      const teamsMap = tournamentGroupsMap.get(groupName)!;
      const teams: TeamGroup[] = [];
      
      // Teams within a group are already grouped by section
      Array.from(teamsMap.entries()).forEach(([teamName, teamStickers]) => {
        const isSpecialGroup = groupName === 'FWC' || groupName === 'Coca-Cola';

        // Sort stickers within each team
        teamStickers.sort((a, b) => {
          if (!isSpecialGroup) {
            // Special sort for teams: #1 first, #13 second, others numerical
            if (a.number === 1) return -1;
            if (b.number === 1) return 1;
            if (a.number === 13) return -1;
            if (b.number === 13) return 1;
          }
          return a.number - b.number;
        });
        
        teams.push({ name: teamName, stickers: teamStickers });
      });
      
      result.push({ name: groupName, teams });
    });

    return result;
  }, [stickers]);

  if (stickers.length === 0) {
    return (
      <div className="py-20 text-center font-mono text-muted uppercase text-sm border border-dashed border-border">
        No stickers found
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {groupedData.map((group) => {
        const isGroupCollapsed = collapsedGroups.has(group.name);
        const groupLabel = group.name.length === 1 ? `GROUP ${group.name}` : group.name;

        return (
          <div key={group.name} className="space-y-8">
            {/* Group Header */}
            <div 
              className="flex items-center gap-6 cursor-pointer group/group-header sticky top-0 bg-bg/95 backdrop-blur-sm z-10 py-4 -mx-4 px-4 border-b border-border/50"
              onClick={() => onToggleGroup(group.name)}
            >
              <button 
                className="text-xs font-mono text-ink border-2 border-ink px-3 py-1 group-hover/group-header:bg-ink group-hover/group-header:text-bg transition-all min-w-[120px] text-center font-bold"
              >
                {isGroupCollapsed ? '[+] EXPAND' : '[-] COLLAPSE'}
              </button>
              <h2 className="font-mono text-lg uppercase tracking-[0.3em] text-ink whitespace-nowrap font-black">
                {groupLabel}
              </h2>
              <div className="h-[2px] w-full bg-ink/10 group-hover/group-header:bg-ink/30 transition-colors"></div>
            </div>

            {/* Teams within Group */}
            <div className={`grid transition-all duration-500 ease-in-out ${isGroupCollapsed ? 'grid-rows-[0fr] opacity-0 pointer-events-none' : 'grid-rows-[1fr] opacity-100'}`}>
              <div className="overflow-hidden">
                <div className="space-y-12 pt-4">
                  {group.teams.map((team) => {
                    const isTeamCollapsed = collapsedSections.has(team.name);
                    const isRedundantHeader = team.name === group.name;
                    
                    return (
                      <div key={team.name} className="space-y-4">
                        {/* Team Header - Hidden if redundant (matches group name) */}
                        {!isRedundantHeader && (
                          <div 
                            className="flex items-center gap-4 cursor-pointer group/team-header ml-4 sm:ml-8"
                            onClick={() => onToggleSection(team.name)}
                          >
                            <button 
                              className="text-[10px] font-mono text-muted border border-border/50 px-2 py-0.5 group-hover/team-header:border-ink group-hover/team-header:text-ink transition-all min-w-[90px] text-center"
                            >
                              {isTeamCollapsed ? '[+] EXPAND' : '[-] COLLAPSE'}
                            </button>
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted whitespace-nowrap group-hover/team-header:text-ink transition-colors">
                              {team.name}
                            </h3>
                            <div className="h-[1px] w-full bg-border/30 group-hover/team-header:bg-ink/30 transition-colors"></div>
                          </div>
                        )}
                        
                        {/* Stickers within Team */}
                        <div className={`grid transition-all duration-300 ease-in-out ${(!isRedundantHeader && isTeamCollapsed) ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                          <div className="overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pt-2 pb-1 ml-4 sm:ml-8">
                              {team.stickers.map((sticker) => (
                                <StickerCardReact 
                                  key={sticker.id}
                                  sticker={sticker}
                                  onToggle={onToggled}
                                  onUpdateDuplicates={(id, delta) => {
                                    const newQuantity = Math.max(0, sticker.duplicates + delta);
                                    onRepeatChanged(id, newQuantity);
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
